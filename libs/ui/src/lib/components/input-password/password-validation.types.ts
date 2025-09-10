export interface PasswordRule {
  id: string;
  regex: RegExp;
  message: string;
  weight?: number;
}

export interface PasswordValidationResult {
  rule: PasswordRule;
  isValid: boolean;
}

export interface PasswordStrength {
  score: number;
  percentage: number;
  level: 'none' | 'weak' | 'fair' | 'good' | 'strong';
  message: string;
  validations: PasswordValidationResult[];
}

export const DEFAULT_PASSWORD_RULES: PasswordRule[] = [
  {
    id: 'minLength',
    regex: /.{8,}/,
    message: 'At least 8 characters',
    weight: 1,
  },
  {
    id: 'hasNumber',
    regex: /\d/,
    message: 'At least 1 number',
    weight: 1,
  },
  {
    id: 'hasLowercase',
    regex: /[a-z]/,
    message: 'At least 1 lowercase letter',
    weight: 1,
  },
  {
    id: 'hasUppercase',
    regex: /[A-Z]/,
    message: 'At least 1 uppercase letter',
    weight: 1,
  },
  {
    id: 'hasSpecialChar',
    regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    message: 'At least 1 special character',
    weight: 1,
  },
];

export function validatePassword(
  password: string,
  rules: PasswordRule[] = DEFAULT_PASSWORD_RULES,
): PasswordStrength {
  const validations = rules.map((rule) => ({
    rule,
    isValid: rule.regex.test(password),
  }));

  const validCount = validations.filter((v) => v.isValid).length;
  const totalWeight = rules.reduce((sum, rule) => sum + (rule.weight ?? 1), 0);
  const score = validations.reduce((sum, v) => sum + (v.isValid ? (v.rule.weight ?? 1) : 0), 0);

  const percentage = totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;

  let level: PasswordStrength['level'] = 'none';
  let message = 'Enter a password';

  if (percentage === 0) {
    level = 'none';
    message = 'Enter a password';
  } else if (percentage <= 40) {
    level = 'weak';
    message = 'Weak password';
  } else if (percentage <= 60) {
    level = 'fair';
    message = 'Fair password';
  } else if (percentage <= 80) {
    level = 'good';
    message = 'Good password';
  } else {
    level = 'strong';
    message = 'Strong password';
  }

  return {
    score,
    percentage,
    level,
    message,
    validations,
  };
}
