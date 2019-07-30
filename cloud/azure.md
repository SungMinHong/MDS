# Azure
## Steal Time이란
CPU Steal time은 하이퍼 바이저가 다른 가상 프로세서를 서비스하는 동안 가상 CPU가 실제 CPU를 기다리는 시간을 백분율로 표시한 값이다.
</br> 
가상 환경에서 동작하는 가상 시스템(VM)은 단일 호스트에 있는 다른 인스턴스와 리소스를 공유한다. 공유 하는 리소스 중 하나가 CPU 주기이다. VM이 실제 서버에 있는 동일한 크기의
4개의 VM 중 하나 인 경우 해당 CPU 사용률은 모든 CPU 주기의 25%로 제한되지 않는다. CPU 사용 비율보다 많은 비율을 사용할 수 있다.
</br>

## CPU steal time이 높은 원인은?
- 만약 동일 물리 서버내 다른 VM에 떠있는 타서비스 인스턴스가 CPU 사용률이 급격히 증가한 경우.
- 더 많은 CPU 리소스를 가지고 있는 VM을 필요로 하는 경우.

## 판단하는 방법
### 1. 클라우드 사업자의 과다 판매의 경우
![](https://user-images.githubusercontent.com/18229419/62093072-cd4fe980-b2b2-11e9-9300-1d7ad65cb3f7.png)
### 2. VM내 리소스 부족의 경우
![](https://user-images.githubusercontent.com/18229419/62093067-c9bc6280-b2b2-11e9-8439-0102547e589b.png)

> 출처: https://brunch.co.kr/@leedongins/23
