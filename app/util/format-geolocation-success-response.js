export const formatGeolocationSuccessResponse = response => {
    const { coords } = response;
    const { accuracy, heading, speed, latitude, longitude } = coords;
    const currentPosition = { latitude, longitude };

    const result = {
        accuracy,
        currentPosition,
        heading,
        speed: speed < 0 ? 0 : speed
    };

    return result;
};
