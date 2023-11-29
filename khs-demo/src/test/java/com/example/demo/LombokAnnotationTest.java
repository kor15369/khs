package com.example.demo;

public class LombokAnnotationTest {

	public static void main(String[] args) {
    	// Test 클래스의 멤버변수 t 생성
		LombokTest t = new LombokTest();
        // lombok에 의해 자동으로 생성된 Setter를 이용하여 1의 값 저장
		t.setA(1);
        // lombok에 의해 자동으로 생성된 Getter를 이용하여 저장한 값 호출
		System.out.println(t.getA());
	}
}