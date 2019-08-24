# 스프링 시큐리티
## 1. 정의
&nbsp;
스프링 시큐리티는 스프링 기반의 어플리케이션의 보안(인증과 권한)을 담당하는 프레임워크이다. 만약 스프링시큐리티를 사용하지 않았다면,
자체적으로 세션을 체크하고 redirect 등을 해야할 것이다. 스프링 시큐리티는 보안과 관련해서 체계적으로 많은 옵션들로 이를 지원해준다.Spring Security는 filter 기반으로 동작하기 때문에 
Spring MVC와 분리되어 관리 및 동작한다. (Spring MVC는 DispatcherServlet 이라는 서블릿을 기반으로 하기 때문에 인터셉터만을 사용할 수 있다. 
하지만 보안과 관련된 부분은 인터셉터 이전 단계인 필터에서 구현하는 것이 일반적이고 효율적이다.)
참고로 security 3.2 부터는 XML로 설정하지 않고도 자바 bean 설정으로 간단하게 설정할 수 있도록 지원한다.

### 보안 관련 용어 정리
- 접근 주체(Principal): 보호된 대상에 접근하는 유저
- 인증(Authenticate): 요청을 보낸 유저가 누구인지 확인(ex. 로그인), 애플리케이션의 작업을 수행할 수 있는 주체임을 증명
- 인가(Authorize): 현재 유저가 어떤 서비스, 페이지에 접근할 수 있는 권한이 있는지 검사
- 권한(Authorization): 인증된 주체가 애플리케이션의 동작을 수행할 수 있는 권한이 있는지 검사
  - 권한 승인이 필요한 부분으로 접근하려면 인증 과정을 통해 주체가 증명 되어야만 한다
  - 권한 부여에도 두가지 영역이 존재하는데 웹 요청 권한, 메소드 호출 및 도메인 인스턴스에 대한 접근 권한 부여
> +)인증과 권한을 구분해 생각하는 것이 스프링 시큐리티를 이해하는데 가장 중요!

## 2. Spring Security의 구조
### 2-1. 인증관련 구조

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile23.uf.tistory.com%2Fimage%2F99A7223C5B6B29F003F5F0)

- n개의 Filter가 존재한다
- Filter 아래 Manager 1 개가 존재한다
- Manager 아래 n'개의 Provider가 존재한다
- Provider를 통해 인증정보와 권한이 담긴 Authentication을 반환한다
- Spring Security는 기본적으로 세션-쿠키방식으로 인증한다.
1. 유저가 로그인을 시도(Http Request)
2. AuthenticationFilter 에서부터 위와같이 2번(UsernamePasswordAuthenticationFilter에서만 사용)->3번->...->6번 순서로 user DB까지 접근(UserDetailsService에서 db 접근 DAO를 사용)
3. DB에 존재하는 유저라면 UserDetails로 꺼내 유저의 session 생셩
4. Spring Security의 인메모리 세션저장소인 SecurityContextHolder에 저장
5. 유저에게 session ID와 함께 응답을 내려줌
6. 이후 요청에서는 요청쿠키에서 JSESSIONID를 보고 검증 후 유효하면 Authentication을 내려 (단 분산환경에서는 여러 방법을 통해 세션정보를 공유하던지 아예 세션을 사용하지 않고 쿠키 등을 이용해 해결해야 한다. 분산 환경에서 Authentication을 어떻게 저장 할지는 차후 정리할 예정이다.)

아래는 로그인 성공 상황인데, 익명세션ID에서 security가 내려주는 유효한 세션ID로 뒤바뀌는 장면이다.
![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile29.uf.tistory.com%2Fimage%2F995E6F365B6B29FF0438FF)

### 2-2. security의 filter들
- 필터를 거쳐 서블릿으로 들어가는 구조 
<br/>

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile30.uf.tistory.com%2Fimage%2F993341355B6B2A0A03B982)

- 더 자세한 필터 종류
<br/>

![](http://postfiles5.naver.net/20150325_212/tmondev_1427249971716oWksh_PNG/image_3_vitualfilterchain.png?type=w2)

+)디버깅은 DelegatingFilterProxy내 VirtualFilterChain부터 시작하는걸 추천.
1. SecurityContextPersistenceFilter: SecurityContextRepository에서 SecurityContext를 가져오거나 저장하는 역할을 한다.
추가적으로 설명하면, Authentication 객체는 필터 체인 상의 최초에 위치한 SecurityContextPersistenceFilter의 (repo)session에 저장된다. 그리고 다음 접속 시에는 (repo)session에서 정보가 담긴 Authentication 객체를 가져올 수 있게 된다. 
<br/>
+) 만약 repo가 null관련 repo라면 저장이 되지 못하고 매번 요청마다 인증을 확인하고 권한을 발급해야한다.

~~~java
// SecurityContextPersistenceFilter내 doFilter
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if (request.getAttribute(FILTER_APPLIED) != null) {
            // ensure that filter is only applied once per request
            chain.doFilter(request, response);
            return;
        }

        final boolean debug = logger.isDebugEnabled();

        request.setAttribute(FILTER_APPLIED, Boolean.TRUE);

        if (forceEagerSessionCreation) {
            HttpSession session = request.getSession();

            if (debug && session.isNew()) {
                logger.debug("Eagerly created session: " + session.getId());
            }
        }

        HttpRequestResponseHolder holder = new HttpRequestResponseHolder(request, response);
        SecurityContext contextBeforeChainExecution = repo.loadContext(holder);

        try {
            SecurityContextHolder.setContext(contextBeforeChainExecution);

            chain.doFilter(holder.getRequest(), holder.getResponse());

        } finally {
            SecurityContext contextAfterChainExecution = SecurityContextHolder.getContext();
            // Crucial removal of SecurityContextHolder contents - do this before anything else.
            SecurityContextHolder.clearContext();
            repo.saveContext(contextAfterChainExecution, holder.getRequest(), holder.getResponse());
            request.removeAttribute(FILTER_APPLIED);

            if (debug) {
                logger.debug("SecurityContextHolder now cleared, as request processing completed");
            }
        }
    }
~~~

2. LogoutFilter: 설정된 로그아웃 URL로 오는 요청을 감시하며, 해당 유저를 로그아웃 처리
3. (UsernamePassword)AuthenticationFilter : (아이디와 비밀번호를 사용하는 form 기반 인증) 설정된 로그인 URL로 오는 요청을 감시하며, 유저 인증 처리
<br/> &nbsp;  3-1. AuthenticationManager를 통한 인증 실행
<br/> &nbsp;  3-2. 인증 성공 시, 얻은 Authentication 객체를 SecurityContext에 저장 후 AuthenticationSuccessHandler 실행
<br/> &nbsp;  3-3. 인증 실패 시, AuthenticationFailureHandler 실행
4. DefaultLoginPageGeneratingFilter : 인증을 위한 로그인폼 URL을 감시한다.
5. BasicAuthenticationFilter : HTTP 기본 인증 헤더를 감시하여 처리한다.
6. RequestCacheAwareFilter : 로그인 성공 후, 원래 요청 정보를 재구성하기 위해 사용된다.
7. SecurityContextHolderAwareRequestFilter : HttpServletRequestWrapper를 상속한 SecurityContextHolderAwareRequestWapper 클래스로 HttpServletRequest 정보를 감싼다. SecurityContextHolderAwareRequestWrapper 클래스는 필터 체인상의 다음 필터들에게 부가정보를 제공한다.
8. AnonymousAuthenticationFilter : 이 필터가 호출되는 시점까지 사용자 정보가 인증되지 않았다면 인증토큰에 사용자가 익명 사용자로 나타난다.
9. SessionManagementFilter : 이 필터는 인증된 사용자와 관련된 모든 세션을 추적한다.
10. ExceptionTranslationFilter : 이 필터는 보호된 요청을 처리하는 중에 발생할 수 있는 예외를 위임하거나 전달하는 역할을 한다.
11. FilterSecurityInterceptor : 이 필터는 AccessDecisionManager 로 권한부여 처리를 위임함으로써 접근 제어 결정을 쉽게해준다.

### 2-3. Authentication
모든 접근 주체(=유저) 는 Authentication 를 생성한다. 
이것은 SecurityContext 에 보관되고 사용된다. 즉 security의 세션들은 내부 메모리(SecurityContextHolder)에 쌓고 꺼내쓰는 것이다. 
참고로 Authentication 인터페이스는 자주 쓰이니 알아둬야한다.

~~~java
public interface Authentication extends Principal, Serializable { 
  Collection<? extends GrantedAuthority> getAuthorities(); // Authentication 저장소에 의해 인증된 사용자의 권한 목록 
  Object getCredentials(); // 주로 비밀번호
  Object getDetails(); // 사용자 상세정보 
  Object getPrincipal(); // 주로 ID 
  boolean isAuthenticated(); //인증 여부 
  void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException; 
}
~~~

### 2-4. AuthenticationManager
![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile23.uf.tistory.com%2Fimage%2F99CD2C3A5B6B2A19032A78)
<br/>
유저의 요청 내에 담긴 Authentication를 AuthenticationManager 에 넘겨주고, AuthenticationManager 를 구현한 ProviderManager가 처리한다. 정확히는 ProviderManager 는
~~~java
private List<AuthenticationProvider> providers; 
~~~ 
로 여러 AuthenticationProvider를 가질 수 있는데, 이 친구들이 처리를 해서 Authentication 를 반환해준다. (실패하면 예외던짐)

- AuthenticationManager : 인증요청을 받고 Authentication를 채운다.
- AuthenticationProvider : 실제 인증이 일어나며, 성공하면 Authentication.isAuthenticated = true 를 한다.

## 3.권한
### 3-1. 권한 부여 (grant authority)
사용자 인증을 성공적으로 마쳤다면, 이제 이 유저에게 권한을 부여한다. 예를 들어 같은 웹사이트에 로그인을 해도 admin 계정으로 로그인을 하면, 일반 사용자들에게는 보이지 않던 관리 메뉴가 하나 더 생기기도 하는것 처럼 말이다. 이런 경우에 일반사용자는 일반 권한을, admin은 관리자+일반 권한을 가지고 있는 것이다. 보안이 제대로 동작하는 웹사이트를 구축하려면 로그인한 유저에게 적절한 권한을 부여하고, 부여된 권한을 잘 관리해야한다.

### 3-2. 리소스 가로채기 (intercept)
권한이 있는 유저에게만 리소스를 제공하는 것도, 일단 리소스를 내가 가지고 있어야 가능하다. 보안이란 본래 권한이 없는 자들이 원천적으로 리소스에 접근할 수 없도록 막아내는 것이다. 그런 의미에서 적절한 권한을 가진자만 해당 자원에 접근할 수 있도록 자원의 외부요청을 원천적으로 가로채는 것(Intercept)은 authorization의 중요한 원칙이다.
<br/>
스프링 시큐리티에서 인터셉터 역할을 하는 필터는 FilterSecurityInterceptor이다. 스프링 시큐리티 필터 체인의 제일 마지막에 위치하고 있는 FilterSecurityInterceptor 에서 특정 요청을 받아들일지 거부할지를 결정한다. FilterSecurityInterceptor 까지 진행되었다는 것은 이미 인증이 완료되고 시스템에서 유효한 사용자라는 것을 이미 알고 있다는 것이다.
FilterSecurityInterceptor 에서는 Authentication의 특정 메소드(Collection<GrantedAuthority> getAuthorities()) 를 통해서 얻은 권한 목록을 통해서 요청을 승인 할지, 거부할 지를 판단한다.

## 4. 직접 디버깅해보기
- TODO: 이어서 정리하기(로그인 상태, 비로그인 상태로 나누어 진행) DelegatingFilterProxy에서 부터 진행할 예정.

- DelegatingFilterProxy(여기부터가 진짜임): DelegatingFilterProxy는 스프링 시큐리티가 모든 애플리케이션 요청을 감싸게 해서 모든 요청에 보안이 적용되게 하는 서블릿필터이다.(스프링 프레임워크에서 제공) 스프링 프레임워크 기반의 웹 애플리케이션에서 서블릿 필터 라이프 사이클과 연계해 스프링 빈 의존성을 서블릿 필터에 바인딩하는데 사용한다.
web.xml에 다음과 같은 설정을 해주면 애플리케이션의 모든 요청을 스프링 시큐리티가 감싸서 처리할 수 있게 된다.
- FilterChainProxy: 방화벽 관련?
- VirtualFilterChain: FilterChainProxy 내부 클래스 , 다른 필터들을 호출할 때 계속 자신의 레퍼런스를 보내 다시 자신의 dofilter를 호출하게 한다.
- SecurityContextPersistenceFilter:
- WebAsyncManagerIntegrationFilter: OncePerRequestFilter를 상속하고 있으며 재정의 없이 OncePerRequestFilter의 doFilter를 사용한다
- PreAuthenticatedProcessingFilter: AbstractPreAuthenticatedProcessingFilter를 상속하고 있으며 재정의 없이 AbstractPreAuthenticatedProcessingFilter의 doFilter()를 사용한다.
  - dofilter()내 requiresAuthentication() 에서는 SecurityContextPersistenceFilter에 저장한 Authentication을 꺼내 인증이 필요한지를 판단한다. 이후 인증이 필요없는 경우 인증로직을 타지 않고 다음 필터를 호출한다.
  - 인증이 필요한 경우 doAuthenticate를 호출한다. Request에서 principal과 credentials를 찾고 PreAuthenticatedAuthenticationToken을 만든다. 이후 토큰을 ProviderManager.authenticate로 넘겨준다. 
~~~java
    /**
     * Try to authenticate a pre-authenticated user with Spring Security if the user has not yet been authenticated.
     */
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        if (logger.isDebugEnabled()) {
            logger.debug("Checking secure context token: " + SecurityContextHolder.getContext().getAuthentication());
        }

        if (requiresAuthentication((HttpServletRequest) request)) {
            doAuthenticate((HttpServletRequest) request, (HttpServletResponse) response);
        }

        chain.doFilter(request, response);
    }
~~~


-------
출처: https://sjh836.tistory.com/165
<br/>
출처: https://offbyone.tistory.com/88
<br/>
출처: https://hanee24.github.io/2018/04/21/authentication-authorization/
<br/>
출처: http://blog.naver.com/PostView.nhn?blogId=tmondev&logNo=220310743818
