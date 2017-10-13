export const convertAccelerationToSpeed = accelerationVector => {
    const { x, y, z } = accelerationVector;
    // subtract one for gravity
    return Math.sqrt(x^2 + y^2 + z^2) - 1;
};
