
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AddUserTest extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:8000")
    .inferHtmlResources()
    .acceptHeader("image/avif,image/webp,*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"If-None-Match" -> """"80bbd9aaa77c6ab13ddbfd8b99907359d61d5599"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"Accept" -> "*/*",
  		"If-None-Match" -> """"4eb24268e14d36ab09807a0bb681be35749ce622""""
  )
  
  private val headers_2 = Map(
  		"Accept" -> "text/css,*/*;q=0.1",
  		"If-None-Match" -> """"7d9af05715904e0e3cfa4a4f9652b7cfbb93228a""""
  )
  
  private val headers_3 = Map("If-None-Match" -> """"7062713d84840244882292d3ba8b93bb59077815"""")
  
  private val headers_4 = Map("If-None-Match" -> """"65ee095e47921eb3939c327551323d2160b957d0"""")
  
  private val headers_5 = Map("If-None-Match" -> """"65ec1acbd922addd29cfa24a8bb6eba228e9762b"""")
  
  private val headers_6 = Map("If-None-Match" -> """"c50d19d0c435eda46d13e78270d4836236358229"""")
  
  private val headers_7 = Map("If-None-Match" -> """"d1ac1507d79525e81a1f0c8dbf66acc65af43b05"""")
  
  private val headers_8 = Map(
  		"Accept" -> "*/*",
  		"Access-Control-Request-Headers" -> "content-type",
  		"Access-Control-Request-Method" -> "POST",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_9 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val uri1 = "localhost"

  private val scn = scenario("AddUserTest")
    .exec(
      http("request_0")
        .get("http://" + uri1 + ":3000/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("http://" + uri1 + ":3000/static/js/main.20248e22.js")
            .headers(headers_1),
          http("request_2")
            .get("http://" + uri1 + ":3000/static/css/main.56b4d383.css")
            .headers(headers_2),
          http("request_3")
            .get("http://" + uri1 + ":3000/help.png")
            .headers(headers_3),
          http("request_4")
            .get("http://" + uri1 + ":3000/logo.jpg")
            .headers(headers_4),
          http("request_5")
            .get("http://" + uri1 + ":3000/login.png")
            .headers(headers_5),
          http("request_6")
            .get("http://" + uri1 + ":3000/instrucciones.png")
            .headers(headers_6),
          http("request_7")
            .get("http://" + uri1 + ":3000/signup.png")
            .headers(headers_7)
        ),
      pause(11),
      http("request_8")
        .options("/adduser")
        .headers(headers_8)
        .resources(
          http("request_9")
            .post("/adduser")
            .headers(headers_9)
            .body(RawFileBody("addusertest/0009_request.json"))
            .check(status.is(400))
        )
    )

	setUp(scn.inject(atOnceUsers(50))).protocols(httpProtocol)
}
