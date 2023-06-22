package com.codesquad.kiosk.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderMenu {
    Integer id;
    Integer orderId;
    Integer menuId;
    Integer quantity;
}
