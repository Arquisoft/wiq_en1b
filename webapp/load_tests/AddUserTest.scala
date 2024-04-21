
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AddUserTest extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://20.123.43.37:8000")
    .inferHtmlResources()
    .acceptHeader("image/avif,image/webp,*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_2 = Map("If-None-Match" -> """"7062713d84840244882292d3ba8b93bb59077815"""")
  
  private val headers_3 = Map("If-None-Match" -> """"c50d19d0c435eda46d13e78270d4836236358229"""")
  
  private val headers_4 = Map("If-None-Match" -> """"d1ac1507d79525e81a1f0c8dbf66acc65af43b05"""")
  
  private val headers_5 = Map("If-None-Match" -> """"65ec1acbd922addd29cfa24a8bb6eba228e9762b"""")
  
  private val headers_6 = Map(
  		"Accept" -> "*/*",
  		"Access-Control-Request-Headers" -> "content-type",
  		"Access-Control-Request-Method" -> "POST",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000"
  )
  
  private val headers_7 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000"
  )
  
  private val uri2 = "http://wiqen1b.serveminecraft.net:3000"

  private val scn = scenario("AddUserTest")
    .exec(
      http("request_0")
        .get(uri2 + "/home")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get(uri2 + "/logo.jpg"),
          http("request_2")
            .get(uri2 + "/help.png")
            .headers(headers_2),
          http("request_3")
            .get(uri2 + "/instrucciones.png")
            .headers(headers_3),
          http("request_4")
            .get(uri2 + "/signup.png")
            .headers(headers_4),
          http("request_5")
            .get(uri2 + "/login.png")
            .headers(headers_5)
        ),
      pause(17),
      http("request_6")
        .options("/adduser")
        .headers(headers_6)
        .resources(
          http("request_7")
            .post("/adduser")
            .headers(headers_7)
            .body(RawFileBody("addusertest/0007_request.json"))
        )
    )

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}
