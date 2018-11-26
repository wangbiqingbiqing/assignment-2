var playList = [];
var dynamicList=[];
var queue=[];

/**
 * Shuffle the order of an given array.
 *
 * @param {array} array - An array needs to be shuffled.
 * @return {array} The same array in shuffled order
 */
function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

/**
 * Set songs into given queue and return the modified queue.
 *
 * @param {array} dynamicList - A array of elements needs to be appended into queue.
 * @param {array} queue - A queue of the playing list.? should mention song or not????????????
 * @return {array} The same queue with the array appended.
 */
export function setSong(dynamicList, queue) {
    if(dynamicList.length ===0){
        return queue;
    }else if(dynamicList.length ===1){
        return queue.push(dynamicList);
    }else if(dynamicList.length ===2){
        var first = dynamicList[0];
        dynamicList.shift();
        dynamicList.push(first);
        var queueAppended = queue.concat(dynamicList);
        queue = queueAppended.slice();
        return queue;
    }else{
        var shuffledArray = dynamicList.slice();
        do {
            shuffle(dynamicList);
        }while(arraysEqual(dynamicList,shuffledArray)||(queue.length !==0?queue[queue.length-1]===dynamicList[0]:false));
        var queueAppended = queue.concat(dynamicList);
        queue = queueAppended.slice();
        return queue;
    }
}

/**
 *  Remove current playing song in the queue and return the next song in the queue
 *
 * @param {array} queue - A queue of playing song list.
 * @return {object} A object with nextSong and playingQueue.
 */
export function getNext(queue){
    //TODO think about when queue is 0 and how to initialize data
    if(queue.length ===0){
        dynamicList= playList.slice();
        setSong(dynamicList,queue);
    }
    //TODO think about queue is null, playlist is null?
    queue.shift();
    return {nextSong:queue.length !==0?queue[0]: setSong(dynamicList,queue)[0],playingQueue:queue};
}

/**
 *  Return the peekNum songs going to play on the queue.
 *  This method does not change the existing arrays, but instead returns a new array.
 *
 * @param {array} queue - A queue of playing song list.
 * @param {number} peekNum - A number which user wants to peek on the queue from the current song.
 * @return {object} A object with the peekQueue and playingQueue list.
 */
export function getPeekQueue(queue,peekNum){
    //TODO think about when queue is 0 and how to initialize data
    if(queue.length ===0){
        dynamicList= playList.slice();
        setSong(dynamicList,queue);
    }
    while(peekNum>=queue.length){
        setSong(dynamicList,queue);
    }
    return {peekQueue:queue.slice(1,peekNum+1),playingQueue:queue};
}


/**
 *  Remove element by index in a queue and return the queue.
 *
 * @param {number} index - The index of the element to be removed.
 * @param {array} queue - A queue of playing song list.
 * @return {array} The queue which removed element on index already .
 */
export function skipSong(index, queue){
    queue.splice(index, 1);
    return queue;
}

/**
 *  Check the equality of two given array.
 *
 * @param {array} index - The index of the element to be removed.
 * @param {array} queue - A queue of playing song list.
 * @return {boolean} Return true when two arrays equal, else false.
 */
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}
