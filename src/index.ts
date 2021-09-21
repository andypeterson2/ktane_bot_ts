import { record } from "node-record-lpcm16";
import { SpeechClient } from "@google-cloud/speech";
import Solver from "./solver";

const client = new SpeechClient();
const solver = new Solver();

const sampleRateHertz = 16000;

const request = {
  config: {
    encoding: "LINEAR16",
    sampleRateHertz: sampleRateHertz,
    languageCode: "en-US",
  },
  interimResults: false,
};

// Create a recognize stream
const recognizeStream = client
  .streamingRecognize(request as any)
  .on("error", console.error)
  .on("data", (data) => {
    if (data.results[0] && data.results[0].alternatives[0]) {
      solver.interpret(data.results[0].alternatives[0].transcript);
    } else {
      process.stdout.write(
        "\n\nReached transcription time limit, press Ctrl+C\n"
      );
    }
  });

record({
  sampleRateHertz: sampleRateHertz,
  threshold: 0,
  verbose: false,
  recordProgram: "rec",
  silence: "10.0",
})
  .stream()
  .on("error", console.error)
  .pipe(recognizeStream);

console.log("Now listening...");
