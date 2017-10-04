export const formatGeolocationSuccessResponse = response => {
    const { coords } = response;
    const { accuracy, heading, speed, latitude, longitude } = coords;
    const currentPosition = { latitude, longitude };

    const result = {
        accuracy,
        heading,
        currentPosition,
        speed
    };

    return result;
};
