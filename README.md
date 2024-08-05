# nvmrc
노드버전 v20.13.1 을 사용합니다
```bash
nvm use
```
를 실행시켜 노드 버전을 맞춰줍니다.

# npmrc
PACKAGE_TOKEN 환경변수에 npm 토큰을 설정합니다.
그래야 styling-kit 패키지를 설치할 수 있습니다.

# 폴더 구조
- components : 컴포넌트를 관리하는 폴더
- hooks : 커스텀 훅을 관리하는 폴더
- pages : 페이지를 관리하는 폴더
- types : 타입을 관리하는 폴더
- utils : 유틸 함수를 관리하는 폴더

폴더를 추가할 경우
- vite.config.ts 에 alias를 추가합니다.
```typescript
{
  // ...
  resolve: {
    alias: [
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
    ]
  }
}  
```
cc) VITE_ 로 prefix 가 붙습니다.

# 환경변수
1. .env.example 파일을 참고하여 .env 파일을 생성합니다.
2. vite-env.d.ts 에 환경변수를 추가합니다.
```typescript
interface ImportMetaEnv {
  VITE_HARS_API: string;
}
```
3. utils/getEnv.ts 에서 환경변수를 가져옵니다.
```typescript
export const getEnv = (key: string) => {
  return import.meta.env;
};

const { VITE_HARS_API } = getEnv();
```

# 페이지 라우팅
- App.tsx에서 페이지 라우팅을 설정합니다.
```typescript jsx
const router = createBrowserRouter([
  {
    element: <MobileLayout />,
    children: [
      {
        path: '/',
        element: <RootPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
]);
```


# Submodule update 방법
```bash
git submodule update --remote
```