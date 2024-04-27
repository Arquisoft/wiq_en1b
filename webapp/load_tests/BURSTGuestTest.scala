
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class BurstGuestTest extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://wiqen1b.serveminecraft.net:3000")
    .inferHtmlResources()
    .acceptHeader("image/avif,image/webp,*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"If-None-Match" -> """"7fb8e46b93553a316e0f0797b662c57bad733dfe"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"Accept" -> "text/css,*/*;q=0.1",
  		"If-None-Match" -> """"1c5e40f1aec9aa27ef4094814fa3bcfd75d36c7e""""
  )
  
  private val headers_2 = Map(
  		"Accept" -> "*/*",
  		"If-None-Match" -> """"5e5bb1e21cd7e4c4090b7468046fbbe5a4a36578""""
  )
  
  private val headers_3 = Map("If-None-Match" -> """"7062713d84840244882292d3ba8b93bb59077815"""")
  
  private val headers_4 = Map("If-None-Match" -> """"65ee095e47921eb3939c327551323d2160b957d0"""")
  
  private val headers_5 = Map("If-None-Match" -> """"86e23e6bf049be077067249dc086499dfde7620a"""")
  
  private val headers_6 = Map("If-None-Match" -> """"65ec1acbd922addd29cfa24a8bb6eba228e9762b"""")
  
  private val headers_7 = Map("If-None-Match" -> """"d1ac1507d79525e81a1f0c8dbf66acc65af43b05"""")
  
  private val headers_8 = Map(
  		"Accept" -> "*/*",
  		"Access-Control-Request-Headers" -> "token",
  		"Access-Control-Request-Method" -> "GET",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000"
  )
  
  private val headers_9 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"211-eylKOmNwJm7M9mm/No1Pt93T4EA"""",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000",
  		"token" -> ""
  )
  
  private val headers_10 = Map(
  		"Accept" -> "audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5",
  		"Accept-Encoding" -> "identity",
  		"If-None-Match" -> """"c2dc612cee2618539cc80edc7e71982b39d16900"""",
  		"Range" -> "bytes=0-"
  )
  
  private val headers_11 = Map(
  		"Accept" -> "audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5",
  		"Accept-Encoding" -> "identity",
  		"If-None-Match" -> """"ede98d89d2ac6ceec41bf22df94c4f8deaa5490e"""",
  		"Range" -> "bytes=0-"
  )
  
  private val headers_12 = Map(
  		"Accept" -> "audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5",
  		"Accept-Encoding" -> "identity",
  		"Range" -> "bytes=0-"
  )
  
  private val uri2 = "http://20.123.45.199:8000/questions/en"

  private val scn = scenario("GuestTest")
    .exec(
      http("request_0")
        .get("/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("/static/css/main.ea46ba81.css")
            .headers(headers_1),
          http("request_2")
            .get("/static/js/main.72c32461.js")
            .headers(headers_2),
          http("request_3")
            .get("/help.png")
            .headers(headers_3),
          http("request_4")
            .get("/logo.jpg")
            .headers(headers_4),
          http("request_5")
            .get("/game.png")
            .headers(headers_5),
          http("request_6")
            .get("/login.png")
            .headers(headers_6),
          http("request_7")
            .get("/signup.png")
            .headers(headers_7)
        ),
      pause(1),
      http("request_8")
        .options(uri2)
        .headers(headers_8)
        .resources(
          http("request_9")
            .get(uri2)
            .headers(headers_9)
        ),
      pause(1),
      http("request_10")
        .get("/incorrect.mp3")
        .headers(headers_10)
        .resources(
          http("request_11")
            .get("/correct.mp3")
            .headers(headers_11)
        ),
      pause(3),
      http("request_12")
        .get("/incorrect.mp3")
        .headers(headers_12)
        .resources(
          http("request_13")
            .get("/correct.mp3")
            .headers(headers_12)
        )
    )

	setUp(scn.inject(constantUsersPerSec(200).during(12)).protocols(httpProtocol))
}
