export const getTotalAcceleration = accelerationVector => {
    const { x, y, z } = accelerationVector;
    return Math.sqrt(x^2 + y^2 + z^2);
};
