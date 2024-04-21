
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LoginTest extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://20.123.43.37:8000")
    .inferHtmlResources()
    .acceptHeader("image/avif,image/webp,*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"If-None-Match" -> """"b5d501da5a087cfc56cf16f4dcaf265ff4cc7e32"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"Accept" -> "*/*",
  		"If-None-Match" -> """"4542ad76d29dc661cacea47c79ceaaffba95765b""""
  )
  
  private val headers_2 = Map(
  		"Accept" -> "text/css,*/*;q=0.1",
  		"If-None-Match" -> """"2cf07eee53619a3b1ac676a4c66ca7db7ee3f311""""
  )
  
  private val headers_3 = Map("If-None-Match" -> """"65ee095e47921eb3939c327551323d2160b957d0"""")
  
  private val headers_4 = Map("If-None-Match" -> """"7062713d84840244882292d3ba8b93bb59077815"""")
  
  private val headers_5 = Map("If-None-Match" -> """"65ec1acbd922addd29cfa24a8bb6eba228e9762b"""")
  
  private val headers_6 = Map("If-None-Match" -> """"c50d19d0c435eda46d13e78270d4836236358229"""")
  
  private val headers_7 = Map("If-None-Match" -> """"d1ac1507d79525e81a1f0c8dbf66acc65af43b05"""")
  
  private val headers_8 = Map(
  		"Accept" -> "*/*",
  		"Access-Control-Request-Headers" -> "content-type",
  		"Access-Control-Request-Method" -> "POST",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000"
  )
  
  private val headers_9 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000"
  )
  
  private val uri2 = "http://wiqen1b.serveminecraft.net:3000"

  private val scn = scenario("LoginTest")
    .exec(
      http("request_0")
        .get(uri2 + "/home")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get(uri2 + "/static/js/main.1e24deb0.js")
            .headers(headers_1),
          http("request_2")
            .get(uri2 + "/static/css/main.5d93e4f8.css")
            .headers(headers_2),
          http("request_3")
            .get(uri2 + "/logo.jpg")
            .headers(headers_3),
          http("request_4")
            .get(uri2 + "/help.png")
            .headers(headers_4),
          http("request_5")
            .get(uri2 + "/login.png")
            .headers(headers_5),
          http("request_6")
            .get(uri2 + "/instrucciones.png")
            .headers(headers_6),
          http("request_7")
            .get(uri2 + "/signup.png")
            .headers(headers_7)
        ),
      pause(18),
      http("request_8")
        .options("/login")
        .headers(headers_8)
        .resources(
          http("request_9")
            .post("/login")
            .headers(headers_9)
            .body(RawFileBody("logintest/0009_request.json"))
        )
    )

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}
