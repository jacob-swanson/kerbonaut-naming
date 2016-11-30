export class Random {
    /**
     * Returns a random integer between min (included) and max (excluded).
     *
     * @param min
     * @param max
     * @returns {number}
     */
    getRandomInt(min, max) {
        const minInt = Math.ceil(min);
        const maxInt = Math.floor(max);
        return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
    }

    /**
     * Returns a random integer between min (included) and max (included).
     *
     * @param min
     * @param max
     * @returns {number}
     */
    getRandomIntInclusive(min, max) {
        const minInt = Math.ceil(min);
        const maxInt = Math.floor(max);
        return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
    }
}

export default new Random();