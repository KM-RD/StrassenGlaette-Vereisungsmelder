#include <DHT.h>
#include <Arduino.h> //required for platformio
#include <Watermeter.h>
#include <SPIFFS.h>



#define DHTPIN 2      // DHT-Sensor an Pin 2 des Arduino
#define DHTTYPE DHT11 // DHT11-Sensor verwenden


DHT dht(DHTPIN, DHTTYPE);

void setup() {
     if (!SPIFFS.begin(true)) {
        Serial.println("Fehler beim Mounten von SPIFFS");
        return;
    }
     Serial.begin(9600);
     dht.begin();
     Serial.println("\n\n***Water Meter Test Programme***");
     delay(3000);
 
}

void loop() {
  // Warte ein paar Sekunden zwischen den Messungen
  delay(2000);

  // Lese Temperatur und Luftfeuchtigkeit
  const char * h = thisMeter.initFilesys();
  Serial.println(h);
  float t = dht.readTemperature();

  // Prüfen, ob die Werte korrekt gelesen wurden
  if (isnan(h) || isnan(t)) {
    Serial.println("Fehler beim Lesen vom DHT-Sensor!");
    return;
  }

  Serial.print("Temperatur: ");
  Serial.print(t);
  Serial.println(" °C");

   // Beispielbedingung: Warnung bei möglichem Glatteis
  if (t <= 1 && h > 80) {
    Serial.println("Achtung: Mögliche Glatteisgefahr!");
  }
}
