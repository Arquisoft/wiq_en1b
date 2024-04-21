
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class PlayTest extends Simulation {

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
  
  private val headers_1 = Map("If-None-Match" -> """"7062713d84840244882292d3ba8b93bb59077815"""")
  
  private val headers_2 = Map("If-None-Match" -> """"65ee095e47921eb3939c327551323d2160b957d0"""")
  
  private val headers_3 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000"
  )
  
  private val uri2 = "http://wiqen1b.serveminecraft.net:3000"

  private val scn = scenario("PlayTest")
    .exec(
      http("request_0")
        .get(uri2 + "/menu")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get(uri2 + "/help.png")
            .headers(headers_1),
          http("request_2")
            .get(uri2 + "/logo.jpg")
            .headers(headers_2)
        ),
      pause(1),
      http("request_3")
        .get("/questions/en")
        .headers(headers_3)
    )

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}
