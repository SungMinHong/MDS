# 엘라스틱서치

## 엘라스틱 서치를 쓰지 말아야 하는 경우
- 저장소로 쓰기에는 아래 단점을 고려한 이후 그래도 쓸만한 경우만 사용해야한다.

### 엘라스틱 서치의 단점
- Security - ElasticSearch does not provide any authentication or access control functionality. There are various enterprise and open-source additions to enable this.
- Transactions - There is no support for transactions or processing on data manipulation. There are certain APIs that can enable workarounds depending on your use case.
- Maturity of tools - ES is still relatively new and has not had time to develop mature client libraries and 3rd party tools which can make development much harder.
- Large Computations - Commands for searching data are not suited to large scans of data with advanced computation on the database side.
- Data Availability - ES makes data available in "near real-time" which may require additional considerations in your application (ie: comments page where a user adds new comment, refreshing the page might not actually show the new post because the index is still updating).
- Durability - Backups, reliability and durability are not as high priority as in other data stores. Everything for indexing, storage and (most critically) cluster coordination is developed in-house and prone to bugs and bad architecture. This is probably the most important if you're going to make ES the primary store since losing your data is never good.

> 출처: https://www.quora.com/Why-shouldnt-I-use-ElasticSearch-as-my-primary-datastore
