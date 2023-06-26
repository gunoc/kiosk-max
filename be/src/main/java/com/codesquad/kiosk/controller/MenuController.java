package com.codesquad.kiosk.controller;

import com.codesquad.kiosk.service.MenuService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @ApiOperation(value = "카테고리별 메뉴 전체 조회")
    @GetMapping("api/menus/{categoryId}")
    public ResponseEntity getMenusByCategory(@PathVariable Integer categoryId) {
        return null;
    }

    @ApiOperation(value = "개별 메뉴 조회")
    @GetMapping("api/carts/{menuId}")
    public ResponseEntity getMenuDetail(@PathVariable Integer menuId){
        return null;
    }
}
