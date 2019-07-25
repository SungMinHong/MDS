# 자바 9

## immutable
<pre>
       List<Integer> integerList = List.of(1,2,3);
       integerList.add(4);  //에러 발생
</pre>

## stream
### iterate, takeWhile, dropWhile
<pre>
        IntStream
                .iterate(1, i -> i < 20, i -> i * 2)
                .forEach(System.out::println);
        System.out.println();

        Stream.of(1, 2, 3, 4, 5, 6).takeWhile(i -> i <= 3).forEach(System.out::println);
        System.out.println();

        Stream.of(1, 6, 5, 2, 3, 4).takeWhile(i -> i <= 3).forEach(System.out::println);
        System.out.println();

        Stream.of(1, 2, 3, 4, 5, 6).dropWhile(i -> i <= 3).forEach(System.out::println);
        System.out.println();

        Stream.of(1, 6, 5, 2, 3, 4).dropWhile(i -> i <= 3).forEach(System.out::println);
        System.out.println();
</pre>

### Stream.ofNullable
<pre>
        System.out.println("--- ofNullable ---");
        long nullCount = Stream.ofNullable(null).count();

        System.out.println("nullable Count: " + nullCount);

        List<Integer> numbers = new ArrayList<Integer>(List.of(1, 2, 3));
        numbers.add(null);
        // numbers [1,2,3,null]

        Map<Integer, String> mapNumber = new HashMap<Integer, String>(Map.of(1, "one", 2, "two", 3, "three"));
        mapNumber.put(null, null);
        // mapNumber [1 - one, 2 - two, 3 - three, null - null]

        System.out.println("--- check Null ---");
        List<String> stringNumbers = numbers.stream().flatMap(s -> {
            String temp = mapNumber.get(s);
            return (temp != null) ? Stream.of(temp) : Stream.empty();
        }).collect(Collectors.toList());
        System.out.println(stringNumbers);

        System.out.println("--- ofNullable ---");
        List<String> newstringNumbers = numbers.stream().flatMap(s -> Stream.ofNullable(mapNumber.get(s)))
                .collect(Collectors.toList());
        System.out.println(newstringNumbers);
</pre>

## CompletableFuture API 강화
