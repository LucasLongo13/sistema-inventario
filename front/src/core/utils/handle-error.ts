export const handleError = (error: any) => {

    if (error?.message && typeof error.message === 'string') {
        return error.message;
    }
    else if (error?.message && Array.isArray(error.message)) {
        return error.message.join(', ');
    }
    else {
        return 'Error';
    }
};