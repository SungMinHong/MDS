# 트리 알고리즘
## Balanced Tree

### 이진트리검색의 문제점
- 트리의 좌우 균형이 맞지 않으면 비효율적이다

### Balncde Tree 개념
- 삽입과 삭제시 필요하면 스스로 균형을 유지한다
- AVL Tree, 2-3 Tree, 2-3-4 Tree, Red-Black Tree, B-tree 등등이 균형을 유지하는 Tree임
- 항상 O(logN)의 검색성능
- 아래 그림과 같이 AVL트리에서는 회전을 이용해 균형 트리를 만들 수 있다. (C를 위로 올리며 회전)
![비균형 트리에서 회전을 이용해 균형 트리로 만든 예시](https://user-images.githubusercontent.com/18229419/64060187-4325d880-cc04-11e9-82f2-7f8a70da6398.png)

## B-Tree 개념

### B-Tree란?
- 하나의 노드에 여러자료가 배치되는 트리구조이다
- 한 노드에 M개의 자료가 배치되면 M차 B-Tree
  - M이 짝수냐 홀수냐에 따라 알고리즘 자체가 다르다. (2,4,6) B-Tree와 (3,5,7) B-Tree는 다르다. 짝수 B-Tree가 알고리즘이 더 복잡한 편이다.
  - 여기서는 M이 3보다 크거나 같은 홀수라고 가정한다
- 아래 그림은 5차 B트리 예시이다

![5차 B-Tree](https://user-images.githubusercontent.com/18229419/64060379-baf50280-cc06-11e9-85b4-7b51cda33ee6.png)
- 2-3 Tree 2차 B-tree와 동일 2-3-4 Tree는 3차 B-tree와 동일하다 

### 규칙
- 노드의 자료수가 N이라면, 자식의 수는 N+1이어야 한다.
- 각 노드의 자료는 정렬된 상태여야 한다.
- 노드의 자료 Dk의 왼쪽 서브트리는 Dk보다 작은 값들이고, Dk의 오른쪽 서브트리는 Dk보다 큰 값들이어야 한다.
- Root노드는 적어도 2개 이상의 자식을 가져여 한다. ("노드의 자료수가 N이라면, 자식의 수는 N+1이어야 한다"는 규칙이 있기 때문에 당연함)
- Root노드를 제외한 모든 노드는 적어도 M/2개의 자료를 가지고 있어야 한다. 소수점은 제외한다. ex)5차 인 경우 2개 이상
- 외부노드로 가는 경로의 길이는 모두 같다.
  - 외부노드는 모두 같은 레벨에 있다.
- 입력자료는 중복될 수 없다.
![5차 B-Tree](https://user-images.githubusercontent.com/18229419/64060379-baf50280-cc06-11e9-85b4-7b51cda33ee6.png)
- 2-3 Tree 2차 B-tree와 동일 2-3-4 Tree는 3차 B-tree와 동일하다 

## B-tree 시뮬레이션
- 시물레이션 해볼 수 있는 사이트 링크: https://www.cs.usfca.edu/~galles/visualization/BTree.html

## B-Tree 골격(시간날 때 진행해보기)
### B-Tree 골격 소스
![BTreeMap Skeleton1](https://user-images.githubusercontent.com/18229419/64066994-d50d0000-cc5b-11e9-9ce2-3d2e4d580f0c.png)
- B-Tree는 중복키를 처리하지 못한다. 그래서 FindFirst/FindNext/RemoveAt은 구현하지 않는다.
- m_nDim은 B-Tree의 차수를 나타낸다. 디폴트는 5차이다.
- B-Tree의 구현에는 m_pNodeHead만 사용하고, m_pNodeTail은 사용하지 않는다. m_pNodeTail 대신에 0(NULL)을 사용한다.

![BTreeMap Skeleton2](https://user-images.githubusercontent.com/18229419/64486353-00e54280-d267-11e9-81ac-dc7360e369ca.png)

![BTreeMap](https://user-images.githubusercontent.com/18229419/64486356-0fcbf500-d267-11e9-9edc-27a870323a69.png)
- k번째 노드의 왼쪽자식은 m_pChildren[k], 오른쪽 자식은 m_pChildren[k+1]
- Root노드는 m_pNodeHead -> Left(0)에 위치함

![BTreeMap Skeleton3:노드단위 삽입,삭제,검색,초기화](https://user-images.githubusercontent.com/18229419/64486429-0f802980-d268-11e9-8595-480ce4d9ab27.png)
- B-tree는 항상 정렬될 상태를 유지해야 하기 때문에 삽입 시 마다 정렬을 함. 삽입정렬을 쓰는 이유는 이미 정렬된 리스트의 경우 O(n)의 시간복잡도를 가지기 때문이다.
- 삭제할 때는 삭제된 키의 뒤 데이터를 하나씩 앞으로 당겨준다.

![BtreeMap Skelton4: B-tree 검색](https://user-images.githubusercontent.com/18229419/64486950-021a6d80-d26f-11e9-94dc-825bc3bc175f.png)
- 전체적으로는 트리검색
- 노드내에서는 순회검색


- TODO:: 이어서 정리


> 출처: [BITcampus 1](https://www.youtube.com/watch?v=WBqKyrL6u-Q)

> 출처: [BITcampus 2](https://www.youtube.com/watch?v=PxREdWmxZG0)

> 출처: [BITcampus 3](https://www.youtube.com/watch?v=kRaI_rhjlcg)
