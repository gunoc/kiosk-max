package com.codesquad.kiosk.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
public class Order {
    Integer id;
    Integer orderNumber;
    Timestamp orderTime;
}
