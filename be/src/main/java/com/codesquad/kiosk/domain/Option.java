package com.codesquad.kiosk.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Option {
    Integer id;
    String name;
    Integer price;
    Integer optionCategoryId;

}
