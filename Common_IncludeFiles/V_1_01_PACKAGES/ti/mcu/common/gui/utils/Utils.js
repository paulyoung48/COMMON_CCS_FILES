/* --COPYRIGHT--,EPL
 *  Copyright (c) 2008 Texas Instruments and others.
 *  All rights reserved. This program and the accompanying materials
 *  are made available under the terms of the Eclipse Public License v1.0
 *  which accompanies this distribution, and is available at
 *  http://www.eclipse.org/legal/epl-v10.html
 *
 *  Contributors:
 *      Texas Instruments - initial implementation
 *
 * --/COPYRIGHT--*/

/*
 *  ======== Utils.xs ========
 */

/*
 *  ======== Utils.xs ========
 */
var $cslUtils =
{
    /* Empty interrupt handler error message */
    intHndEmptyError : "interrupt handler is empty. Enter a function name to continue.",

    /* Stores a global string for interrupt handler error message */
    intHndCharError : "interrupt handler cannot contain any special character.",

    /*
     *  ======== specialCharacters ========
     */
    specialCharacters : function (stringName) {
        var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>? ";

        for (var i = 0; i < stringName.length; i++) {
            if (iChars.indexOf(stringName.charAt(i)) != -1) {
                return true;
            }
        }
        return false;
    },

    /*
     *  ======== isAlphaAndNums ========
     */
    isAlphaAndNums : function (stringName) {
        var alpha = /^[a-zA-Z0-9]*$/;
        if (alpha.test(stringName)) {
            return false;
        }
        else {
            return true;
        }
    },

    /*
     *  ======== isAlpha ========
     */
    isAlpha : function (stringName) {
        var alpha = /^[a-zA-Z]*$/;
        if (alpha.test(stringName)) {
            return false;
        }
        else {
            return true;
        }
    },

    /*
     *  ======== isNums ========
     */
    isNums : function (stringName) {
        var nums = /^[0-9]*$/;
        if (nums.test(stringName)) {
            return false;
        }
        else {
            return true;
        }
    },

    /*
     *  ======== convertFreqToTimeString ========
     */
    convertFreqToTimeString : function (baudRate) {
        if(baudRate == 0) {
            var temptBit = 0;
        }
        else {
            var temptBit = 1 / baudRate;
        }

        var temptBit = convertTimeToTimeString(temptBit);

        return temptBit;
    },

    /*
     *  ======== convertTimeToTimeString ========
     */
    convertTimeToTimeString : function (value) {
        var returnString;

        if(value < 0.001)
        {
            // us convert
            value = value * 10000000;   // Upconvert it.
            value = Math.round(value);
            value = value / 10;         // Downscale with a .0 precision
            returnString = value.toString() + " us";
        }
        else if(value < 1)
        {
            // ms convert
            value = value * 10000;      // Upconvert it.
            value = Math.round(value);
            value = value / 10;         // Downscale with a .0 precision
            returnString = value.toString() + " ms";
        }
        else
        {
            value = value * 10;
            value = Math.round(value) / 10;
            returnString = value.toString() + " s";
        }

        return returnString;
    },

    /*
     *  ======== convertTimeToFreqString ========
     */
    convertTimeToFreqString : function (value) {
        var returnStringFreq;

        if (value > 0) {
            value = 1 / value;
        }
        else {
            value = 0;
        }

        returnStringFreq = convertFreqToFreqString(value);

        return returnStringFreq;
    },

    /*
     *  ======== convertFreqToFreqString ========
     */
    convertFreqToFreqString : function (value) {
        var returnStringFreq;

        if (value > 1000) {
            value = value / 10;
            value = Math.round(value);
            returnStringFreq = value / 100;
            returnStringFreq = returnStringFreq.toString() + " kHz";
        }
        else if ((value >= 0.0001) && (value < 0.1)) {
            value = value * 100000;
            value = Math.round(value);
            returnStringFreq = value / 100;
            returnStringFreq = returnStringFreq.toString() + " mHz";
        }
        else if ((value >= 0.000000001) && (value < 0.0001)) {
            value = value * 100000000;
            value = Math.round(value);
            returnStringFreq = value / 100;
            returnStringFreq = returnStringFreq.toString() + " nHz";
        }
        else if (value > 0) {
            value = value * 10;
            returnStringFreq = Math.round(value) / 10;
            returnStringFreq = returnStringFreq.toString() + " Hz";
        }
        else {
            returnStringFreq = 0;
            returnStringFreq = returnStringFreq.toString() + " Hz";
        }

        return returnStringFreq;
    }
};