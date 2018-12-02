// an array to save temporary shuffled order of the selected playlist
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
 * The songs are shuffled in a order which is different from previous round.
 *
 * When there is 0 song, return queue as it is
 * When there is 1 song, directly append to queue
 * When there is 2 songs, directly append to queue to avoid the same song in a row case,except reset mode
 * if it's reset operation, arrange playlist to guarantee the first song of the new round is different from the current playing song
 * When there is more than 2 songs, shuffle the playlist to guarantee its order is different from last round,
 * if it's reset song operation, the first song of the new round is different from the current playing song;
 * if it's set song operation, the first song of the next round is different from the last song of current round,
 * append new round list on the queue and return updated queue
 *
 * @param {array} dynamicList - A array of songs in a playlist
 * @param {array} queue - A queue of the playing songs
 * @param {boolean} resetFlag - A boolean to differentiate resetSong and setSong logic. ResetFlag marks as true when users change a playlist or users click reshuffle current playlist
 * @return {array} An updated queue with the next playing round appended in different shuffled order.
 */
export function setSong(dynamicList, queue, resetFlag = false) {
  if (dynamicList.length === 0) {
    return queue;
  } else if (dynamicList.length === 1) {
    queue.push(dynamicList[0]);
    return queue;
  } else if (dynamicList.length === 2) {
    if (resetFlag && queue[0].songId === dynamicList[0].songId)  {
      const first = dynamicList[0];
      dynamicList.shift();
      dynamicList.push(first);
    }
    return queue.concat(dynamicList);
  } else {
    let currentRound = dynamicList.slice();
    if (resetFlag) {
      do {
        shuffle(dynamicList);
      } while (arraysEqual(currentRound, dynamicList) || queue[0].songId === dynamicList[0].songId);
    } else {
      do {
        shuffle(dynamicList);
      } while (arraysEqual(currentRound, dynamicList) || queue[queue.length - 1].songId === dynamicList[0].songId);
    }
    return queue.concat(dynamicList);
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
    //The initial case when no song on the playlist and queue only contains default audio, then getNext repeat the current song until user shuffles a valid playlist
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
 *  This method does not change the existing playing queue's order but returns a new array of peekNum songs following the current order.
 *
 *  When peekNum is larger than the number of the rest song on playing queue, set playing queue,
 *  until the playing queue has enough songs for peek
 *
 * @param {array} queue - A queue of playing song list.
 * @param {number} peekNum - A number which user wants to peek on the queue.
 * @return {object} A object with the peekQueue and playingQueue list.
 */

export function getPeekQueue(queue, peekNum) {
  if (dynamicList.length === 0) {
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

/**
 *  Set DynamicList as same as the given playlist. Happens when user change a playlist to shuffle
 *
 * @param {array} playlist - A playlist be selected.
 */
export function setDynamicList(playlist) {
  dynamicList = playlist.slice();
}

/**
 *  Check whether the two given arrays have same element
 *
 * @param {array} arrA
 * @param {array} arrB
 * @return {boolean} Return true when two arrays have same element, which is arrA contains every element in arrB and arrB has every element in arrA.
 */

export function arraysWithSameElement(arrA, arrB) {
  let arrAIds = [];
  let arrBIds = [];
  arrA.forEach(song => arrAIds.push(song.songId));
  arrB.forEach(song => arrBIds.push(song.songId));
  return arrAIds.length === arrBIds.length && arrAIds.sort().every(function (value, index) {
    return value === arrBIds.sort()[index]
  });
}

/**
 *  Check the equality of two given array and returns true only when two array with same element in same order
 *
 * @param {array} arr1
 * @param {array} arr2
 * @return {boolean} Return true when two arrays equal, else false.
 */
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (let i = arr1.length; i--;) {
    if (arr1[i].songId !== arr2[i].songId)
      return false;
  }
  return true;
}