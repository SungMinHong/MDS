# 자바에서 유의할 점

## 직렬화가 쓰이는 경우 반드시 List 인터페이스의 sublist()를 피할 것!
- subList를 사용한 경우 
~~~java
public class Main {

    public static void main(String[] args) throws IOException {
        String[] array = new String[3];
        array[0] = "홍";
        array[0] = "성";
        array[0] = "민";
        List<String> list =  Collections.unmodifiableList(Arrays.asList(array));
        list = list.subList(0, 2);
        System.out.println(list.getClass());
        byte[] bytes = pickle(list);    //occur error!
    }

    private static <T> byte[] pickle(T obj)
            throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(obj);
        oos.close();
        return baos.toByteArray();
    }
    
}
~~~

- Collections내 UnmodifiableRandomAccessList의 subList가 호출되고
~~~java
    /**
     * @serial include
     */
    static class UnmodifiableRandomAccessList<E> extends UnmodifiableList<E>
                                              implements RandomAccess
    {
        UnmodifiableRandomAccessList(List<? extends E> list) {
            super(list);
        }

        public List<E> subList(int fromIndex, int toIndex) {
            return new UnmodifiableRandomAccessList<>(
                list.subList(fromIndex, toIndex));
        }

        private static final long serialVersionUID = -2542308836966382001L;

        /**
         * Allows instances to be deserialized in pre-1.4 JREs (which do
         * not have UnmodifiableRandomAccessList).  UnmodifiableList has
         * a readResolve method that inverts this transformation upon
         * deserialization.
         */
        private Object writeReplace() {
            return new UnmodifiableList<>(list);
        }
    }
~~~

- AbstractList내 subList를 통해 RandomAccessSubList가 생성된다.
~~~java
    public List<E> subList(int fromIndex, int toIndex) {
        return (this instanceof RandomAccess ?
                new RandomAccessSubList<>(this, fromIndex, toIndex) :
                new SubList<>(this, fromIndex, toIndex));
    }
~~~
- UnmodifiableRandomAccessList의 부모 클래스인 UnmodifiableList에 있는 list 필드에 RandomAccessSubList가 저장된 것이다. (ArrayList 생성자 처럼 생성자에 리스트를 넘긴 경우 깊은 복사를 하지 않는다.)
~~~java
 static class UnmodifiableList<E> extends UnmodifiableCollection<E>
                                  implements List<E> {
        private static final long serialVersionUID = -283967356065247728L;

        final List<? extends E> list;
        //..중략
}
~~~

- 하지만 RandomAccessSubList에는 직렬화 인터페이스가 없다. 이로 인해 직렬화에 실패하게 된다.
~~~java
class RandomAccessSubList<E> extends SubList<E> implements RandomAccess {
    RandomAccessSubList(AbstractList<E> list, int fromIndex, int toIndex) {
        super(list, fromIndex, toIndex);
    }

    public List<E> subList(int fromIndex, int toIndex) {
        return new RandomAccessSubList<>(this, fromIndex, toIndex);
    }
}
~~~

- 만약 subList결과를 사용해 직렬화 하라면 ArrayList로 감싸서 사용해야 한다. (깊은 복사)
~~~java
 list = new ArrayList<>(list.subList(0, 2));
~~~
