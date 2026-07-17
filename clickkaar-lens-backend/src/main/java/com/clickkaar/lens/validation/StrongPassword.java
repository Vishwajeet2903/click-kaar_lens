package com.clickkaar.lens.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.Pattern;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$", message = "Password must contain uppercase, lowercase, number, special character and be at least 8 characters")
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {})
public @interface StrongPassword {
  String message() default "Password must contain uppercase, lowercase, number, special character and be at least 8 characters";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
