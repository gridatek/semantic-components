# Semantic Form Structure Guide

This guide explains the comprehensive form structure used in the Semantic Components UI library, demonstrating how to build accessible, well-structured forms using our semantic components.

## Overview

The Semantic Components form structure follows web standards and accessibility best practices, providing a complete set of form-related components that work together seamlessly. Our form components are designed to:

- Follow semantic HTML patterns
- Provide excellent accessibility out of the box
- Use consistent design system tokens
- Minimize custom CSS requirements
- Support complex form layouts

## Component Hierarchy

```
Form Structure
├── ScFieldset (fieldset[sc-fieldset])
│   ├── ScLegend (legend[sc-legend])
│   ├── ScField (sc-field)
│   │   ├── ScLabel (label[sc-label])
│   │   ├── Form Control (input[sc-input], select[sc-select], etc.)
│   │   ├── ScFieldDescription (p[sc-field-description])
│   │   └── ScErrorMessage (p[sc-error-message])
│   └── ScCheckboxField (sc-checkbox-field)
│       ├── Form Control (input[sc-checkbox])
│       └── ScLabel (label[sc-label])
```

## Core Components

### ScFieldset - `fieldset[sc-fieldset]`

Groups related form controls with semantic meaning and consistent styling.

```html
<fieldset class="space-y-4" sc-fieldset>
  <!-- Related form fields -->
</fieldset>
```

**Features:**

- Provides semantic grouping for related controls
- Automatic spacing between controls
- Accessibility support for screen readers
- Consistent border and padding styling

### ScLegend - `legend[sc-legend]`

Provides accessible titles for fieldset groups.

```html
<fieldset sc-fieldset>
  <legend sc-legend>Account Information</legend>
  <!-- Form fields -->
</fieldset>
```

**Features:**

- Semantic heading for fieldset content
- Proper font weight and sizing
- Dark mode support
- Screen reader accessibility

### ScField - `sc-field`

Container for individual form controls with label and description support.

```html
<sc-field>
  <label sc-label for="email">Email Address</label>
  <input id="email" sc-input type="email" />
  <p sc-field-description>We'll use this for account verification</p>
</sc-field>
```

**Features:**

- Automatic spacing between label, control, and description
- Support for floating labels
- Automatic ID generation and association
- Error state handling

### ScCheckboxField - `sc-checkbox-field`

Specialized container for checkbox and radio button controls.

```html
<sc-checkbox-field>
  <input id="notifications" sc-checkbox type="checkbox" />
  <label sc-label for="notifications">Email notifications</label>
</sc-checkbox-field>
```

**Features:**

- Optimized layout for checkbox controls
- Proper touch targets (44px minimum)
- Horizontal or vertical orientation
- Better mobile interaction

## Form Controls

### Text Inputs - `input[sc-input]`

```html
<input id="username" sc-input type="text" placeholder="Enter username" data-slot="control" />
```

### Select Dropdowns - `select[sc-select]` with `sc-option`

```html
<sc-select id="country">
  <sc-option value="">Select country</sc-option>
  <sc-option value="us">United States</sc-option>
  <sc-option value="ca">Canada</sc-option>
</sc-select>
```

### Checkboxes - `input[sc-checkbox]`

```html
<input id="terms" sc-checkbox type="checkbox" data-slot="control" />
```

### Labels - `label[sc-label]`

```html
<label sc-label for="field-id">Field Label</label>
```

## Supporting Components

### ScFieldDescription - `p[sc-field-description]`

Provides helpful context for form fields.

```html
<p sc-field-description>Choose a password with at least 8 characters</p>
```

**Features:**

- Consistent muted text styling
- Automatic association with form controls
- Small text size for secondary information
- Theme-aware coloring

### ScErrorMessage - `p[sc-error-message]`

Displays validation errors (implementation varies).

```html
<p sc-error-message>This field is required</p>
```

## Complete Form Examples

### Basic Form Structure

```html
<form>
  <fieldset class="space-y-4" sc-fieldset>
    <legend sc-legend>Account Setup</legend>

    <sc-field>
      <label sc-label for="full-name">Full Name</label>
      <input id="full-name" sc-input type="text" placeholder="Enter your full name" />
      <p sc-field-description>Enter your full legal name as it appears on official documents</p>
    </sc-field>

    <sc-field>
      <label sc-label for="email">Email Address</label>
      <input id="email" sc-input type="email" placeholder="Enter your email" />
      <p sc-field-description>
        We'll use this email for account verification and important notifications
      </p>
    </sc-field>

    <sc-field>
      <label sc-label for="role">Role</label>
      <sc-select id="role">
        <sc-option value="">Select your role</sc-option>
        <sc-option value="developer">Developer</sc-option>
        <sc-option value="designer">Designer</sc-option>
        <sc-option value="manager">Manager</sc-option>
      </sc-select>
      <p sc-field-description>Choose the role that best describes your primary job function</p>
    </sc-field>
  </fieldset>
</form>
```

### Multiple Fieldsets with Preferences

```html
<form>
  <!-- Account Information Fieldset -->
  <fieldset class="space-y-4" sc-fieldset>
    <legend sc-legend>Account Information</legend>
    <!-- Text fields as shown above -->
  </fieldset>

  <!-- Preferences Fieldset -->
  <fieldset class="space-y-4" sc-fieldset>
    <legend sc-legend>Notification Preferences</legend>

    <sc-checkbox-field>
      <input id="email-notifications" sc-checkbox type="checkbox" checked />
      <label sc-label for="email-notifications">Email notifications</label>
    </sc-checkbox-field>

    <sc-checkbox-field>
      <input id="sms-notifications" sc-checkbox type="checkbox" />
      <label sc-label for="sms-notifications">SMS notifications</label>
    </sc-checkbox-field>
  </fieldset>

  <!-- Privacy Settings Fieldset -->
  <fieldset sc-fieldset>
    <legend sc-legend>Privacy Settings</legend>

    <sc-checkbox-field>
      <input id="public-profile" sc-checkbox type="checkbox" />
      <label sc-label for="public-profile">Make profile public</label>
    </sc-checkbox-field>
  </fieldset>
</form>
```

## Stepper Integration

The form components work seamlessly with our stepper component for multi-step forms:

```html
<sc-stepper (stepCompleteEvent)="onStepComplete()">
  <sc-step label="Account Setup">
    <div class="space-y-4">
      <h3 sc-heading level="3">Create your account</h3>
      <p class="text-sm text-muted-foreground">
        Let's start by setting up your account information.
      </p>

      <fieldset class="space-y-4" sc-fieldset>
        <!-- Form fields -->
      </fieldset>
    </div>
  </sc-step>

  <sc-step label="Preferences">
    <!-- Another step with fieldsets -->
  </sc-step>
</sc-stepper>
```

## Accessibility Features

### Screen Reader Support

- **Fieldsets and Legends**: Provide context for grouped controls
- **Label Association**: Automatic `for` attribute linking
- **Descriptions**: Associated with controls via ARIA attributes
- **Focus Management**: Proper tab order and focus indicators

### Touch Accessibility

- **Minimum Touch Targets**: 44px minimum for interactive elements
- **Checkbox Fields**: Optimized for mobile interaction
- **Proper Spacing**: Adequate space between interactive elements

### Keyboard Navigation

- **Tab Order**: Logical progression through form elements
- **Focus Indicators**: Visible focus states on all controls
- **Semantic HTML**: Native keyboard behavior preserved

## Design System Integration

### CSS Custom Properties

All components use design system tokens:

- `--color-primary`: Primary brand colors
- `--color-muted-foreground`: Secondary text
- `--color-background`: Background colors
- `--color-border`: Border colors

### Consistent Spacing

- Uses Tailwind spacing utilities
- Automatic spacing via component logic
- Responsive design support

### Theme Support

- Light and dark mode compatible
- High contrast support
- Reduced motion support

## Best Practices

### 1. Group Related Fields

```html
<!-- ✅ Good: Related fields grouped -->
<fieldset sc-fieldset>
  <legend sc-legend>Contact Information</legend>
  <!-- Phone, email, address fields -->
</fieldset>

<!-- ❌ Avoid: Unrelated fields together -->
<fieldset sc-fieldset>
  <legend sc-legend>Mixed Information</legend>
  <!-- Phone, password, favorite color -->
</fieldset>
```

### 2. Use Appropriate Field Types

```html
<!-- ✅ Good: Checkbox for boolean choices -->
<sc-checkbox-field>
  <input sc-checkbox type="checkbox" />
  <label sc-label>Subscribe to newsletter</label>
</sc-checkbox-field>

<!-- ✅ Good: Regular field for text input -->
<sc-field>
  <label sc-label>Company Name</label>
  <input sc-input type="text" />
</sc-field>
```

### 3. Provide Helpful Descriptions

```html
<!-- ✅ Good: Clear, helpful description -->
<sc-field>
  <label sc-label for="password">Password</label>
  <input id="password" sc-input type="password" />
  <p sc-field-description>
    Must be at least 8 characters with one number and one special character
  </p>
</sc-field>
```

### 4. Maintain Logical Structure

```html
<!-- ✅ Good: Logical step progression -->
<sc-stepper>
  <sc-step label="Account"><!-- Basic info --></sc-step>
  <sc-step label="Profile"><!-- Detailed info --></sc-step>
  <sc-step label="Preferences"><!-- Settings --></sc-step>
  <sc-step label="Review"><!-- Confirmation --></sc-step>
</sc-stepper>
```

## Common Patterns

### Required Fields

```html
<sc-field>
  <label sc-label for="required-field">
    Required Field
    <span class="text-destructive">*</span>
  </label>
  <input id="required-field" sc-input required />
</sc-field>
```

### Optional Fields

```html
<sc-field>
  <label sc-label for="optional-field">Optional Field</label>
  <input id="optional-field" sc-input />
  <p sc-field-description>(Optional)</p>
</sc-field>
```

### Field Groups with Multiple Options

```html
<fieldset sc-fieldset>
  <legend sc-legend>Notification Preferences</legend>

  <sc-checkbox-field>
    <input id="email" sc-checkbox type="checkbox" />
    <label sc-label for="email">Email updates</label>
  </sc-checkbox-field>

  <sc-checkbox-field>
    <input id="sms" sc-checkbox type="checkbox" />
    <label sc-label for="sms">SMS alerts</label>
  </sc-checkbox-field>

  <sc-checkbox-field>
    <input id="push" sc-checkbox type="checkbox" />
    <label sc-label for="push">Push notifications</label>
  </sc-checkbox-field>
</fieldset>
```

## Conclusion

The Semantic Components form structure provides a complete, accessible, and maintainable approach to building forms. By following these patterns and using our semantic components, you can create forms that are:

- **Accessible**: Screen reader friendly with proper ARIA support
- **Consistent**: Following design system patterns and spacing
- **Maintainable**: Minimal custom CSS with centralized styling
- **Flexible**: Adaptable to various form layouts and requirements
- **Professional**: Following web standards and best practices

For more examples, see the stepper demo component which showcases all these patterns in a real-world multi-step form implementation.
