package com.codesquad.kiosk.controller;

import com.codesquad.kiosk.service.OrderService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @ApiOperation(value = "결제")
    @PostMapping("api/payments/{method}")
    public ResponseEntity pay(@PathVariable String method) {
        return null;
    }

    @ApiOperation(value = "개별 주문 상세 조회")
    @GetMapping("api/receipts/{orderId}")
    public ResponseEntity getOrderDetail(@PathVariable Integer orderId){
        return null;
    }
}
