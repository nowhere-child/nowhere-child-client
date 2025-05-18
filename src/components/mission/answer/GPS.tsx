import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnswerData } from "../AnswerBar";

// 위치 유효성 검증을 위한 인터페이스 정의
interface GPSAnswer {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

// 위치 검증 훅 구현
function useLocationValidation(
  config: AnswerData,
  location: { lat: number; lng: number } | null
) {
  const [isValid, setIsValid] = useState(false);
  const [gpsRange, setGpsRange] = useState<GPSAnswer | null>(null);

  // answer 문자열 파싱
  useEffect(() => {
    if (config.answer) {
      try {
        const [lat1, lat2, lng1, lng2] = config.answer.split(",").map(Number);

        // 최소값, 최대값 계산 (순서가 바뀔 수 있으므로)
        setGpsRange({
          latMin: Math.min(lat1, lat2),
          latMax: Math.max(lat1, lat2),
          lngMin: Math.min(lng1, lng2),
          lngMax: Math.max(lng1, lng2),
        });
      } catch (e) {
        console.error("GPS answer 형식 오류:", e);
      }
    }
  }, [config.answer]);

  // 위치 유효성 검증
  useEffect(() => {
    if (!location || !gpsRange) {
      setIsValid(false);
      return;
    }

    const { lat, lng } = location;
    const { latMin, latMax, lngMin, lngMax } = gpsRange;

    // latMax: 37.58406;
    // latMin: 37.583441;
    // lngMax: 127.060367;
    // lngMin: 127.059774;

    // 위도와 경도가 모두 범위 내에 있는지 확인
    const isValidLocation =
      lat >= latMin && lat <= latMax && lng >= lngMin && lng <= lngMax;

    setIsValid(isValidLocation);

    if (isValidLocation) {
      console.log("✅ 유효한 위치입니다!");
    } else {
      console.log("❌ 위치가 인증 범위를 벗어났습니다.");
    }
  }, [location, gpsRange]);

  return { isValid, gpsRange };
}

function GPS({
  onSuccess,
  config,
  setV,
}: {
  onSuccess: () => void;
  config: AnswerData & { answer?: string };
  setV: (v: string) => void;
}) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  // const [accuracy, setAccuracy] = useState<number | null>(null);
  // const [timestamp, setTimestamp] = useState<number | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const { isValid, gpsRange } = useLocationValidation(config, location);
  console.log("gpsRange", gpsRange);

  const [watchId, setWatchId] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  const handleGPS = () => {
    onSuccess();
  };
  setV(config.answer!);

  // 위치 감시 시작
  const startWatching = () => {
    if (!navigator.geolocation) {
      toast.error("이 브라우저는 위치 기능을 지원하지 않아요.");
      // setError("이 브라우저는 위치 기능을 지원하지 않아요.");
      return;
    }

    // 이전 감시 중단
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    toast.info("위치 추적을 시작합니다...");

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy: posAccuracy } = pos.coords;
        const now = Date.now();

        // 너무 자주 업데이트되지 않도록 스로틀링 (2초마다)
        if (now - lastUpdate < 2000) return;

        // 정확도 필터링 (정확도가 너무 낮으면 무시)
        if (posAccuracy > 100) {
          console.log(`정확도 낮음(${posAccuracy}m), 위치 무시`);
          return;
        }

        console.log(
          `새 위치: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (정확도: ${posAccuracy}m)`
        );
        // setAccuracy(posAccuracy);
        // setTimestamp(pos.timestamp);
        setLocation({ lat: latitude, lng: longitude });
        setLastUpdate(now);
        // setError(null);

        toast.success(`위치 갱신됨 (정확도: ${posAccuracy.toFixed(2)}m)`);
      },
      () => {
        // setError(`위치 요청 실패: ${err.message}`);
        toast.error("위치를 추적할 수 없습니다");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );

    setWatchId(id);
  };

  // 위치 감시 중단
  const stopWatching = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      toast.info("위치 추적을 중단했습니다");
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex items-center justify-center gap-4">
        <div
          className={`h-4 w-4 rounded-full ${watchId !== null ? "bg-blue-400" : "bg-white"}`}
        />
        {watchId === null ? (
          <button
            onClick={startWatching}
            className="px-4 py-2 bg-white text-black rounded-lg text-sm"
          >
            ▶️ 위치 추적 시작하기
          </button>
        ) : (
          <button
            onClick={stopWatching}
            className="px-4 py-2 bg-red-400 text-white rounded-lg text-sm"
          >
            ⏹️ 위치 추적 중단하기
          </button>
        )}
      </div>
      <p>점점 정확해질거에요!</p>
      <p>{location?.lat}</p>
      <p>{location?.lng}</p>

      <button
        onClick={handleGPS}
        // disabled={!isValid}
        className={`w-full py-2 rounded-[20px] text-lg mt-4 ${
          isValid
            ? "bg-blue-400 text-white"
            : "bg-gray-600 text-gray-500 cursor-not-allowed"
        }`}
      >
        📍 위치 인증하기
      </button>
      <div className="text-center">
        <p className="pb-10">확신을 가지고 목적지를 돌아다녀 주세요!</p>
      </div>
    </div>
  );
}

export default GPS;
