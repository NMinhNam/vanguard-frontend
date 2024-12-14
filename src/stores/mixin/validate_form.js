export const useValidation = () => {
    /*
    formRule = {
        fullname: {
            required: true,
            maxLength: 200,
            minLength: 50,
        },
        dateStart: {
            date: true,
            compareDate: '>= today',
        },
        dateEnd: {
            date: true,
            compareDate: '> date dateStart', 
        },
    }
    formData = {
        fullname: 'Nhóm Vanguard',
        dateStart: '10-12-2024',
        dateEnd: '10-11-2024',
    }
    */
    const validateForm = (formRule, formData) => {
        const error = {}
        for (const field in formRule) {
            const fieldsRule = formRule[field]
            const value = formData[field] || ''

            if (fieldsRule.required && !value) {
                error[field] = 'required'
                continue
            }
            if (fieldsRule.pattern && !fieldsRule.pattern.test(value)) {
                error[field] = 'pattern'
                continue
            }
            if (fieldsRule.email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(value)) {
                    error[field] = 'email'
                    continue
                }
            }
            if (fieldsRule.minLength && value.length < fieldsRule.minLength) {
                error[field] = 'minLength'
            }
            if (fieldsRule.maxLength && value.length > fieldsRule.maxLength) {
                error[field] = 'maxLength'
            }
            if (fieldsRule.number && isNaN(value)) {
                error[field] = 'number'
                continue
            }
            if (fieldsRule.compareNumber) {
                let rule = fieldsRule.compareNumber.split(' ')[0]
                let valueCompare = !isNaN(fieldsRule.compareNumber.split(' ')[1])
                    ? fieldsRule.compareNumber.split(' ')[1]
                    : formData[fieldsRule.compareNumber.split(' ')[0]]
                compareNumber(value, rule, valueCompare) ? null : (error[field] = 'compareNumber')
            }
            if (fieldsRule.date) {
                checkDate(value) ? null : (error[field] = 'date')
            }
            // if (fieldsRule.compareDate) {
            //     let rule = fieldsRule.compareDate.split(' ')[0]
            //     let valueCompare = fieldsRule.compareDate.split(' ')[2] || fieldsRule.compareDate.split(' ')[1]
            //     compareDate(value, rule, valueCompare) ? null : (error[field] = 'compareDate')
            // }
            if (fieldsRule.compareDate) {
                const [rule, , valueCompare = fieldsRule.compareDate.split(' ')[1]] = fieldsRule.compareDate.split(' ');
                compareDate(value, rule, valueCompare) ? null : (error[field] = 'compareDate');
            }
            
            if (!error[field]) {
                error[field] = false
            }
        }
        return error
    }
    const compareNumber = (value, rule, valueCompare) => {
        if (!isNaN(valueCompare)) {
            switch (rule) {
                case '>':
                    return value > valueCompare
                case '>=':
                    return value >= valueCompare
                case '<':
                    return value < valueCompare
                case '<=':
                    return value <= valueCompare
                default:
                    return value === valueCompare
            }
        }
    }
    const checkDate = (value) => {
        const regex = /^\d{2}-\d{2}-\d{4}$/
        if (!regex.test(value)) {
            return false
        }
        const [day, month, year] = value.split('-').map(Number)
        if (month < 1 || month > 12) {
            return false
        }
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
        // if (month === 2) {
        //     if (isLeapYear && day > 29) {
        //         return false
        //     } else if (!isLeapYear && day > 28) {
        //         return false
        //     }
        // } else {
        //     if (day < 1 || day > daysInMonth[month - 1]) {
        //         return false
        //     }
        // }
        // Điều chỉnh số ngày của tháng 2 nếu là năm nhuận
        if (month === 2 && isLeapYear) {
            daysInMonth[1] = 29;
        }

        // Kiểm tra ngày có hợp lệ không
        if (day < 1 || day > daysInMonth[month - 1]) {
            return false;
        }
        return true
    }
    const compareDate = (value, rule, valueCompare) => {
        const d1 = new Date(value).getTime()
        const d2 = (valueCompare == 'today') ? new Date(valueCompare).getTime() : new Date(valueCompare).getTime()
        switch (rule) {
            case '>':
                return d1 > d2
            case '>=':
                return d1 >= d2
            case '<':
                return d1 < d2
            case '<=':
                return d1 <= d2
            default:
                return d1 === d2
        }
    }

    return { validateForm }
}
