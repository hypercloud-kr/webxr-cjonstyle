import dayjs from 'dayjs';

export const YupTest: Record<
  string,
  (option?: any) => [string, string, (data?: string) => boolean]
> = {};

YupTest.date = (required: boolean) => [
  `date`,
  '날짜 형식이 올바르지 않습니다.',
  data => {
    if (!required && !data) return true;
    if (!data || data?.length !== 10) return false;
    // IOS(Safari) .으로 구분되는걸 인식 못해서 /로 바꿔줌
    const formattedDate = data.replaceAll('.', '/');
    const day = dayjs(formattedDate);
    if (!day.isValid()) return false;
    // 1999.12.34 가 들어오는 경우 2000.01.03 으로 바뀌는 문제가 있어서 처리
    return day.format('YYYY.MM.DD') === data;
  },
];

YupTest.phone = () => [
  `phone`,
  '전화번호 형식이 올바르지 않습니다.',
  data => {
    if (!data) return false;
    const phone = data.replace(/[^0-9]/g, '');
    if (phone.length < 10) return false;
    // 전화번호 체크 정규식
    const pattern = /^01([016789])\d{3,4}\d{4}$/;
    return pattern.test(phone);
  },
];
