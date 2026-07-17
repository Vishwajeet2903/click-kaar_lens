package com.clickkaar.lens.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.Pattern;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone must be a valid Indian mobile number")
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {})
public @interface IndianPhone {
  String message() default "Phone must be a valid Indian mobile number";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
