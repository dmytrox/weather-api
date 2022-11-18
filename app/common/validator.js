class Validator {
    /**
     * Validate date using reg. exp.
     * @param {string} dateStr 
     * @returns 
     */
    date(dateStr){
        const regex = /^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/;
        return dateStr.match(regex);
    }
}

module.exports = new Validator();