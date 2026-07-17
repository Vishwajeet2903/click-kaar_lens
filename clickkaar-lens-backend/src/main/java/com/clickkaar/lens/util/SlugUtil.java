package com.clickkaar.lens.util;

public final class SlugUtil {
  private SlugUtil() {}

  public static String slugify(String value) {
    return value == null ? "" : value.trim().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
  }
}
