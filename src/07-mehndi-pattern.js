/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {
  if (typeof char !== "string" || char.length === 0 || n <= 0) {
    return "";
  }
  return char + repeatChar(char, n - 1);
}

export function sumNestedArray(arr, index = 0) {
  if (!Array.isArray(arr)) return 0;
  if (index >= arr.length) return 0;
  const current = arr[index];
  if (Array.isArray(current)) {
    return sumNestedArray(current) + sumNestedArray(arr, index + 1);
  }
  if (typeof current === "number" && !Number.isNaN(current)) {
    return current + sumNestedArray(arr, index + 1);
  }
  return sumNestedArray(arr, index + 1);
}

export function flattenArray(arr, index = 0) {
  if (!Array.isArray(arr)) return [];
  if (index >= arr.length) return [];

  const current = arr[index];

  if (Array.isArray(current)) {
    return [
      ...flattenArray(current),
      ...flattenArray(arr, index + 1)
    ];
  }
  return [
    current,
    ...flattenArray(arr, index + 1)
  ];
}

export function isPalindrome(str, start = 0, end) {
  if (typeof str !== "string") return false;
  if (end === undefined) {
    str = str.toLowerCase();
    end = str.length - 1;
  }
  if (start >= end) return true;
  if (str[start] !== str[end]) return false;
  return isPalindrome(str, start + 1, end - 1);
}

export function generatePattern(n) {
  if (!Number.isInteger(n) || n <= 0) return [];

  function buildAscending(level) {
    if (level === 1) return ["*"];

    const prev = buildAscending(level - 1);
    return [...prev, repeatChar("*", level)];
  }

  function mirror(arr, index) {
    if (index < 0) return [];
    return [arr[index], ...mirror(arr, index - 1)];
  }

  const ascending = buildAscending(n);

  // Important: start from n-2 (exclude last element)
  return [...ascending, ...mirror(ascending, ascending.length - 2)];
}