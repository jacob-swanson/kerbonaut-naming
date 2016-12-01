import Random from './Random'
import data from './data'
import KerbalGender from './KerbalGender'
import Kerbal from './Kerbal'

export class KerbalGenerator {
    /**
     * Get a random proper Kerbal name.
     *
     * @param {KerbalGender} kerbalGender
     * @private
     */
    _getRandomProperName(kerbalGender) {
        return data[kerbalGender.name].names[Random.getRandomInt(0, data[kerbalGender.name].names.length)];
    }

    /**
     * Check if a kerbal name is valid.
     *
     * @param {String} kerbalName
     * @returns {boolean}
     * @private
     */
    _isNameValid(kerbalName) {
        for (let term of data.forbidden) {
            if (kerbalName.includes(term)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get a random valid Kerbal name.
     *
     * @param {KerbalGender} kerbalGender
     * @returns {String}
     * @private
     */
    _getRandomName(kerbalGender) {
        let kerbalName;
        do {
            kerbalName = data[kerbalGender.name].prefixes[Random.getRandomInt(0, data[kerbalGender.name].prefixes.length)] +
                data[kerbalGender.name].suffixes[Random.getRandomInt(0, data[kerbalGender.name].suffixes.length)];
        } while (!this._isNameValid(kerbalName));
        return kerbalName;
    }

    /**
     * Generate a random Kerbal of the given gender.
     *
     * @param kerbalGender
     * @returns {Kerbal}
     */
    generate(kerbalGender) {
        const isProper = Random.getRandomInt(0, 20) === 0;

        return new Kerbal(kerbalGender, isProper ? this._getRandomProperName(kerbalGender) : this._getRandomName(kerbalGender));
    }

    /**
     * Generate a random Kerbal.
     *
     * @returns {Kerbal}
     */
    generateRandom() {
        return this.generate(Random.getRandomInt(0, 2) === 0 ? KerbalGender.Male : KerbalGender.Female);
    }
}

export default new KerbalGenerator();