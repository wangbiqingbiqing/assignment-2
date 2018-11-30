export var dynamicList = [];

/**
 * Shuffle the order of an given array by Fisher-Yates shuffle algorithm
 *
 * @param {array} array - An array needs to be shuffled.
 * @return {array} The same array in shuffled order
 */
function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

/**
 * Set shuffled songs into given queue and return the updated queue.
 * The songs are in the shuffled order which is different from previous round.
 *
 * When there is 0 song, return queue as it is
 * When there is 1 song, directly append to queue
 * When there is 2 songs, change the order to differentiate from last round and append to queue
 * When there is more than 2 songs, shuffle the order to guarantee it's different from last round,
 * if it's reset song operation, the first song of the new round won't be same as current playing song;
 * if it's set song operation, the first song of the next round is not same as the last song of current round,
 * append new round list on the queue and return updated queue
 *
 * @param {array} dynamicList - A array of songs in a playlist
 * @param {array} queue - A queue of the playing songs
 * @param {boolean} resetFlag - A boolean to differentiate resetSong and setSong logic
 * @return {array} The same queue with the songs appended in different shuffled order.
 */
export function setSong(dynamicList, queue, resetFlag = false) {
  let queueAppended;
  if (dynamicList.length === 0) {
    return queue;
  } else if (dynamicList.length === 1) {
    queue.push(dynamicList[0]);
    return queue;
  } else if (dynamicList.length === 2) {
    const first = dynamicList[0];
    dynamicList.shift();
    dynamicList.push(first);
    queueAppended = queue.concat(dynamicList);
    queue = queueAppended.slice();
    return queue;
  } else {
    let currentRound = dynamicList.slice();
    if (resetFlag) {
      do {
        shuffle(dynamicList);
      } while (arraysEqual(currentRound, dynamicList) || queue[0] === dynamicList[0]);
    } else {
      do {
        shuffle(dynamicList);
      } while (arraysEqual(currentRound, dynamicList) || queue[queue.length - 1] === dynamicList[0]);
    }
    queueAppended = queue.concat(dynamicList);
    return queueAppended;
  }
}

/**
 *  Remove current playing song in the queue and return the next song in the queue
 *  When playing queue only contains current playing song, which is no next song on the queue,
 *  set playing queue and then get next song
 *
 * @param {array} queue - A queue of playing song list.
 * @return {object} A object with nextSong and playingQueue.
 */
export function getNext(queue) {
  if (queue.length === 1) {
    //The case when no song on the playlist and queue only contains current playing song, then getNext repeat the current song
    if (dynamicList.length === 0) {
      return {nextSong: queue[0], playingQueue: queue};
    }
    queue = setSong(dynamicList, queue);
  }
  queue.shift();
  return {nextSong: queue[0], playingQueue: queue};
}

/**
 *  Return the number of peekNum songs going to play on the queue.
 *  This method does not change the existing playing queue's order but returns a new array of peekNum songs with same order.
 *
 *  When peekNum is larger than the number of the rest song on playing queue, set playing queue,
 *  until the playing queue has enough rest songs for peek
 *
 * @param {array} queue - A queue of playing song list.
 * @param {number} peekNum - A number which user wants to peek on the queue from the current song.
 * @return {object} A object with the peekQueue and playingQueue list.
 */

//todo check when didn't choose playlist, should be no next songs on the queue
export function getPeekQueue(queue, peekNum) {
  if(dynamicList.length===0){
    return {peekQueue: [], playingQueue: queue}
  }
  while (peekNum >= queue.length) {
    queue = setSong(dynamicList, queue);
  }
  return {peekQueue: queue.slice(1, peekNum + 1), playingQueue: queue};
}

/**
 *  Skip a song by index in a queue and return the updated queue.
 *  With other songs remaining on the queue with previous order.
 *
 * @param {number} index - The index of the song to be removed from the queue.
 * @param {array} queue - A queue of playing song list.
 * @return {array} The queue which removed element on index already .
 */
export function skipSong(index, queue) {
  queue.splice(index, 1);
  return queue;
}

/**
 *  Start playing with the chosen song on the queue
 *  Skip the songs before the chosen song and follow the order of the rest songs on the queue
 *
 * @param {number} index - The index of the song to be played in the queue.
 * @param {array} queue - A queue of playing song list.
 * @return {array} The updated queue with chosen song as the current play.
 */
export function startPlayingWithSong(index, queue) {
  queue.splice(0, index);
  return queue;
}

export function setDynamicList(playlist) {
  dynamicList = playlist.slice();
}

export function isSamePlaylist(listA, listB) {
  let listAIds = [];
  let listBIds = [];
  listA.forEach(song => listAIds.push(song.songId));
  listB.forEach(song => listBIds.push(song.songId));

  return listAIds.length === listBIds.length && listAIds.sort().every(function (value, index) {
    return value === listBIds.sort()[index]
  });
}

/**
 *  Check the equality of two given array.
 *
 * @param {array} arr1
 * @param {array} arr2
 * @return {boolean} Return true when two arrays equal, else false.
 */
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (let i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i])
      return false;
  }
  return true;
}