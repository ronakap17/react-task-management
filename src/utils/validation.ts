export const required = ({name, value}, {values}): boolean => {
    return value !== '' && value !== undefined && value !== null;
};

export const email = ({name, value}, {values}): boolean => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(value);
};

export const validateOperatingTime = (oldValue, newValue): { type, difference } | null => {
    if ((newValue < oldValue || newValue - 40 >= oldValue) && oldValue > 0) {
        if (newValue < oldValue) {
            return {type: 'underLimit', difference: oldValue - newValue};
        } else {
            return {type: 'overLimit', difference: newValue - oldValue};
        }
    }
    return null;
};


function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
  }