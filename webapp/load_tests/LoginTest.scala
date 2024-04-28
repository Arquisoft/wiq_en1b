
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class LoginTest extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://wiqen1b.serveminecraft.net:3000")
    .inferHtmlResources()
    .acceptHeader("image/avif,image/webp,*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"If-None-Match" -> """"23cd247262374aa9f354f287be15b227be4ffdc8"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"Accept" -> "*/*",
  		"If-None-Match" -> """"0d9319e48bb9c6299e791d37bf623f9351ccefa1""""
  )
  
  private val headers_2 = Map(
  		"Accept" -> "text/css,*/*;q=0.1",
  		"If-None-Match" -> """"1c5e40f1aec9aa27ef4094814fa3bcfd75d36c7e""""
  )
  
  private val headers_3 = Map("If-None-Match" -> """"65ee095e47921eb3939c327551323d2160b957d0"""")
  
  private val headers_4 = Map("If-None-Match" -> """"7062713d84840244882292d3ba8b93bb59077815"""")
  
  private val headers_5 = Map("If-None-Match" -> """"d1ac1507d79525e81a1f0c8dbf66acc65af43b05"""")
  
  private val headers_6 = Map("If-None-Match" -> """"65ec1acbd922addd29cfa24a8bb6eba228e9762b"""")
  
  private val headers_7 = Map("If-None-Match" -> """"c50d19d0c435eda46d13e78270d4836236358229"""")
  
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
  
  private val headers_15 = Map(
  		"Accept" -> "*/*",
  		"Access-Control-Request-Headers" -> "token",
  		"Access-Control-Request-Method" -> "GET",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000"
  )
  
  private val headers_16 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000",
  		"token" -> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJkMjA0MTRkMDY2NjE0OGZkMDA3ZDIiLCJpYXQiOjE3MTQyMzM0MzksImV4cCI6MTcxNDIzNzAzOX0.MPgFSRGxoXlTmi8Tfe8ZWYSXQkCrqnVI3c80w7BEbbs"
  )
  
  private val headers_17 = Map(
  		"Accept" -> "audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5",
  		"Accept-Encoding" -> "identity",
  		"Range" -> "bytes=0-"
  )
  
  private val headers_21 = Map(
  		"Accept" -> "audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5",
  		"Accept-Encoding" -> "identity",
  		"If-None-Match" -> """"c2dc612cee2618539cc80edc7e71982b39d16900"""",
  		"Range" -> "bytes=0-"
  )
  
  private val headers_22 = Map(
  		"Accept" -> "audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,application/ogg;q=0.7,video/*;q=0.6,*/*;q=0.5",
  		"Accept-Encoding" -> "identity",
  		"If-None-Match" -> """"ede98d89d2ac6ceec41bf22df94c4f8deaa5490e"""",
  		"Range" -> "bytes=0-"
  )
  
  private val headers_24 = Map(
  		"Accept" -> "*/*",
  		"Access-Control-Request-Headers" -> "content-type,token",
  		"Access-Control-Request-Method" -> "POST",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000"
  )
  
  private val headers_25 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://wiqen1b.serveminecraft.net:3000",
  		"token" -> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJkMjA0MTRkMDY2NjE0OGZkMDA3ZDIiLCJpYXQiOjE3MTQyMzM0MzksImV4cCI6MTcxNDIzNzAzOX0.MPgFSRGxoXlTmi8Tfe8ZWYSXQkCrqnVI3c80w7BEbbs"
  )
  
  private val uri2 = "http://20.123.45.199:8000"

  private val scn = scenario("LoginTest")
    .exec(
      http("request_0")
        .get("/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("/static/js/main.e5ae103b.js")
            .headers(headers_1),
          http("request_2")
            .get("/static/css/main.ea46ba81.css")
            .headers(headers_2),
          http("request_3")
            .get("/logo.jpg")
            .headers(headers_3),
          http("request_4")
            .get("/help.png")
            .headers(headers_4),
          http("request_5")
            .get("/signup.png")
            .headers(headers_5),
          http("request_6")
            .get("/login.png")
            .headers(headers_6),
          http("request_7")
            .get("/instrucciones.png")
            .headers(headers_7)
        ),
      pause(7),
      http("request_8")
        .options(uri2 + "/login")
        .headers(headers_8)
        .resources(
          http("request_9")
            .post(uri2 + "/login")
            .headers(headers_9)
            .body(RawFileBody("logintest/0009_request.json")),
          http("request_10")
            .get("/menu")
            .headers(headers_0),
          http("request_11")
            .get("/static/js/main.e5ae103b.js")
            .headers(headers_1),
          http("request_12")
            .get("/static/css/main.ea46ba81.css")
            .headers(headers_2),
          http("request_13")
            .get("/logo.jpg")
            .headers(headers_3),
          http("request_14")
            .get("/help.png")
            .headers(headers_4)
        ),
      pause(6),
      http("request_15")
        .options(uri2 + "/questions/en")
        .headers(headers_15)
        .resources(
          http("request_16")
            .get(uri2 + "/questions/en")
            .headers(headers_16),
          http("request_17")
            .get("/tictac.mp3")
            .headers(headers_17),
          http("request_18")
            .get("/tictac.mp3")
            .headers(headers_17)
        ),
      pause(1),
      http("request_19")
        .get("/incorrect.mp3")
        .headers(headers_17)
        .resources(
          http("request_20")
            .get("/correct.mp3")
            .headers(headers_17)
        ),
      pause(2),
      http("request_21")
        .get("/incorrect.mp3")
        .headers(headers_21),
      pause(3),
      http("request_22")
        .get("/correct.mp3")
        .headers(headers_22)
        .resources(
          http("request_23")
            .get("/incorrect.mp3")
            .headers(headers_21)
        ),
      pause(2),
      http("request_24")
        .options(uri2 + "/record")
        .headers(headers_24)
        .resources(
          http("request_25")
            .post(uri2 + "/record")
            .headers(headers_25)
            .body(RawFileBody("logintest/0025_request.json"))
        ),
      pause(5),
      http("request_26")
        .options(uri2 + "/record/loadtest")
        .headers(headers_15)
        .resources(
          http("request_27")
            .get(uri2 + "/record/loadtest")
            .headers(headers_16)
        ),
      pause(7),
      http("request_28")
        .get("/home")
        .headers(headers_0)
        .resources(
          http("request_29")
            .get("/static/js/main.e5ae103b.js")
            .headers(headers_1),
          http("request_30")
            .get("/static/css/main.ea46ba81.css")
            .headers(headers_2),
          http("request_31")
            .get("/help.png")
            .headers(headers_4),
          http("request_32")
            .get("/logo.jpg")
            .headers(headers_3),
          http("request_33")
            .get("/signup.png")
            .headers(headers_5),
          http("request_34")
            .get("/login.png")
            .headers(headers_6),
          http("request_35")
            .get("/instrucciones.png")
            .headers(headers_7)
        )
    )

	setUp(scn.inject(constantUsersPerSec(2).during(10)).protocols(httpProtocol))
}
