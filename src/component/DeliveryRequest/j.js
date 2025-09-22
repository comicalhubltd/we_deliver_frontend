// Unit conversion constants
const CONVERSION_RATES = {
  'CM': 1,        // Base unit
  'FEET': 30.48,  // 1 foot = 30.48 cm
  'INCH': 2.54    // 1 inch = 2.54 cm
};

/**
 * Convert any unit to CM
 * @param {number} value - The measurement value
 * @param {string} unit - The unit type ('CM', 'FEET', 'INCH')
 * @returns {number} - Value converted to CM
 */
function convertToCM(value, unit) {
  const upperUnit = unit.toUpperCase();
  
  if (!CONVERSION_RATES.hasOwnProperty(upperUnit)) {
    throw new Error(`Unsupported unit: ${unit}. Supported units are: CM, FEET, INCH`);
  }
  
  return value * CONVERSION_RATES[upperUnit];
}

/**
 * Calculate item volume in cubic CM
 * @param {object} dimensions - Object containing height, length, width, and unit
 * @returns {number} - Volume in cubic CM
 */
function calculateVolume(dimensions) {
  const { height, length, width, unit } = dimensions;
  
  const heightCM = convertToCM(height, unit);
  const lengthCM = convertToCM(length, unit);
  const widthCM = convertToCM(width, unit);
  
  return heightCM * lengthCM * widthCM;
}

/**
 * Calculate delivery fee based on dimensions, distance, and item value
 * @param {object} item - Item details (must include value property)
 * @param {number} distance - Distance in km
 * @returns {object} - Delivery calculation details
 */
function calculateDeliveryFee(item, distance) {
  const { height, length, width, unit, value } = item;
  
  // Convert all dimensions to CM
  const dimensionsCM = {
    height: convertToCM(height, unit),
    length: convertToCM(length, unit),
    width: convertToCM(width, unit)
  };
  
  // Calculate volume in cubic CM
  const volumeCM3 = calculateVolume(item);
  
  // Convert volume to cubic meters for easier calculation
  const volumeM3 = volumeCM3 / 1000000;
  
  // Example delivery fee calculation (customize as needed)
  const baseRate = 5.00; // Base delivery fee
  const volumeRate = 2.00; // Rate per cubic meter
  const distanceRate = 0.50; // Rate per km
  const valuePercentage = 0.05; // 5% of item value
  
  const volumeFee = volumeM3 * volumeRate;
  const distanceFee = distance * distanceRate;
  const valueFee = value * valuePercentage; // 5% of item value
  const totalFee = baseRate + volumeFee + distanceFee + valueFee;
  
  return {
    dimensionsCM,
    volumeCM3: Math.round(volumeCM3 * 100) / 100, // Round to 2 decimal places
    volumeM3: Math.round(volumeM3 * 1000000) / 1000000, // Round to 6 decimal places
    baseRate,
    volumeFee: Math.round(volumeFee * 100) / 100,
    distanceFee: Math.round(distanceFee * 100) / 100,
    valueFee: Math.round(valueFee * 100) / 100, // 5% of item value
    totalFee: Math.round(totalFee * 100) / 100,
    distance,
    itemValue: value
  };
}

// Example usage:
const item1 = {
  height: 2,
  length: 3,
  width: 1.5,
  unit: 'FEET',
  value: 250.00 // Item value in currency
};

const item2 = {
  height: 50,
  length: 30,
  width: 20,
  unit: 'CM',
  value: 100.00 // Item value in currency
};

const item3 = {
  height: 12,
  length: 8,
  width: 6,
  unit: 'INCH',
  value: 75.50 // Item value in currency
};

// Calculate delivery fees
console.log('Item 1 (2x3x1.5 feet, $250 value):');
console.log(calculateDeliveryFee(item1, 10)); // 10 km distance

console.log('\nItem 2 (50x30x20 cm, $100 value):');
console.log(calculateDeliveryFee(item2, 15)); // 15 km distance

console.log('\nItem 3 (12x8x6 inches, $75.50 value):');
console.log(calculateDeliveryFee(item3, 5)); // 5 km distance

// Helper function for form validation
function validateDimensions(height, length, width, unit, value) {
  const errors = [];
  
  if (!height || height <= 0) errors.push('Height must be greater than 0');
  if (!length || length <= 0) errors.push('Length must be greater than 0');
  if (!width || width <= 0) errors.push('Width must be greater than 0');
  if (!value || value <= 0) errors.push('Item value must be greater than 0');
  
  const validUnits = ['CM', 'FEET', 'INCH'];
  if (!validUnits.includes(unit.toUpperCase())) {
    errors.push(`Unit must be one of: ${validUnits.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}