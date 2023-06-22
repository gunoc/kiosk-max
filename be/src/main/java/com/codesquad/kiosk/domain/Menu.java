package com.codesquad.kiosk.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Menu {
    Integer id;
    String name;
    Integer categoryId;
    Integer price;
    String img;
}
