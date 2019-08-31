# 트리 알고리즘
## Balanced Tree
### 이진트리검색의 문제점
- 트리의 좌우 균형이 맞지 않으면 비효율적이다
### Balncde Tree
- 삽입과 삭제시 필요하면 스스로 균형을 유지한다
- AVL Tree, 2-3 Tree, 2-3-4 Tree, Red-Black Tree, B-tree 등등이 균형을 유지하는 Tree임
- 항상 O(logN)의 검색성능
- 아래 그림과 같이 AVL트리에서는 회전을 이용해 균형 트리를 만들 수 있다. (C를 위로 올리며 회전)
![비균형 트리에서 회전을 이용해 균형 트리로 만든 예시](https://user-images.githubusercontent.com/18229419/64060187-4325d880-cc04-11e9-82f2-7f8a70da6398.png)
## B-Tree
### 정의
- 하나의 노드에 여러자료가 배치되는 트리구조이다
- 한 노드에 M개의 자료가 배치되면 M차 B-Tree
  - M이 짝수냐 홀수냐에 따라 알고리즘 자체가 다르다. (2,4,6) B-Tree와 (3,5,7) B-Tree는 다르다. 짝수 B-Tree가 알고리즘이 더 복잡한 편이다.
  - 여기서는 M이 3보다 크거나 같은 홀수라고 가정한다
- 아래 그림은 5차 B트리 예시이다
![5차 B-Tree](https://user-images.githubusercontent.com/18229419/64060379-baf50280-cc06-11e9-85b4-7b51cda33ee6.png)
## B+ Tree

> 출처: [BITcampus.com](https://www.youtube.com/watch?v=WBqKyrL6u-Q)
