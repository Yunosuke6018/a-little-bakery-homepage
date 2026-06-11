# architecture.md

# a little bakery+

## Architecture

---

## このドキュメントの目的

このドキュメントは、

a little bakery+ のWebサイトをどのような技術構成で作るかを定義する。

---

目的は、

複雑なシステムを作ることではない。

お店の雰囲気を届け、

月に一度の営業カレンダー更新を無理なく行える、

小さく続けやすいWebサイトを作ることである。

---

## 基本方針

シンプルに作る。

---

運用負荷を増やさない。

---

必要以上に機能を増やさない。

---

まずは a little bakery+ 専用として作る。

ただし、将来的に他のお店でも流用できるように、

営業カレンダー機能は独立しやすい構成にする。

---

## 採用技術

### Frontend

Next.js App Router

---

### Language

TypeScript

---

### Styling

Tailwind CSS

---

### CMS

microCMS

---

### Hosting

Vercel

---

### Image Export

html-to-image

---

## システム全体構成

```txt
User
│
├─ Public Website
│  └─ alittlebakery.com
│
└─ Admin Calendar
   └─ alittlebakery.com/admin/calendar
```

---

## 公開サイト

### URL

```txt
https://alittlebakery.com
```

---

### 役割

お店の雰囲気を届ける。

今月のお休みを伝える。

来店に必要な情報を伝える。

---

### 主なセクション

Hero

小さなパン屋のこと

今月のお休み

いつものパン

お店へ

---

## 管理画面

### URL

```txt
/admin/calendar
```

---

### 画面名

お店のカレンダー

---

### 役割

今月のお休みを更新する。

今月の一言を入力する。

Instagramや店頭掲示に使える画像を保存する。

---

### 操作

休みの日を選ぶ

今月の一言を書く

ホームページに反映する

画像を保存する

---

## データ管理

### microCMSで管理するもの

営業カレンダー

店舗情報

いつものパン

---

### 静的ファイルで管理してよいもの

初期のAbout文

固定コピー

固定画像

Hero動画

---

## microCMS API設計

### monthlySchedule

今月のお休みを管理する。

---

Fields

```ts
type MonthlySchedule = {
  year: number;
  month: number;
  closedDays: number[];
  monthlyMessage?: string;
};
```

---

### shopInfo

店舗情報を管理する。

---

Fields

```ts
type ShopInfo = {
  shopName: string;
  address: string;
  businessHours: string;
  closedDaysText: string;
  phoneNumber?: string;
  googleMapUrl?: string;
  instagramUrl?: string;
  parkingInfo?: string;
};
```

---

### breads

いつものパンを管理する。

---

Fields

```ts
type Bread = {
  name: string;
  image?: string;
  description: string;
  displayOrder: number;
};
```

---

## 画像保存

### 対象

営業カレンダー

---

### 形式

PNG

---

### 推奨サイズ

1080 × 1080px

---

### 用途

Instagram投稿

店頭掲示

スマートフォン保存

印刷

---

### 実装方針

画面上のカレンダーデザインをHTML/CSSで構築する。

そのDOM要素を画像として書き出す。

---

## ディレクトリ構成

```txt
src
├─ app
│  ├─ page.tsx
│  ├─ layout.tsx
│  ├─ globals.css
│  │
│  ├─ admin
│  │  └─ calendar
│  │     └─ page.tsx
│  │
│  └─ api
│     └─ calendar
│        └─ route.ts
│
├─ components
│  ├─ home
│  │  ├─ HeroSection.tsx
│  │  ├─ AboutSection.tsx
│  │  ├─ ScheduleSection.tsx
│  │  ├─ BreadSection.tsx
│  │  └─ VisitSection.tsx
│  │
│  ├─ calendar
│  │  ├─ CalendarGrid.tsx
│  │  ├─ CalendarDayButton.tsx
│  │  ├─ CalendarEditor.tsx
│  │  ├─ CalendarImageCard.tsx
│  │  └─ CalendarPreview.tsx
│  │
│  └─ ui
│     ├─ Button.tsx
│     ├─ SectionTitle.tsx
│     └─ Textarea.tsx
│
├─ features
│  └─ calendar
│     ├─ calendar.types.ts
│     ├─ calendar.utils.ts
│     ├─ calendar.constants.ts
│     └─ useCalendarImageExport.ts
│
├─ lib
│  ├─ microcms.ts
│  └─ env.ts
│
└─ data
   └─ breads.ts
```

---

## コンポーネント責務

### HeroSection

Hero動画とコピーを表示する。

---

### AboutSection

お店紹介文を表示する。

---

### ScheduleSection

今月のお休みを表示する。

---

### BreadSection

いつものパンを表示する。

---

### VisitSection

店舗情報と地図を表示する。

---

### CalendarEditor

管理画面全体を管理する。

---

### CalendarGrid

月間カレンダーを表示する。

---

### CalendarDayButton

日付ボタンを表示する。

---

### CalendarImageCard

画像保存用のカレンダー表示を管理する。

---

## 認証方針

初期MVPでは高度な認証は行わない。

---

管理画面は合言葉ログインを想定する。

---

理由

利用者が限定されるため。

ITに慣れていない人でも使いやすくするため。

初期実装を複雑にしないため。

---

## ドメイン

### 取得済みドメイン

```txt
alittlebakery.com
```

---

### 管理

お名前.com

---

### 公開先

Vercel

---

### 移行方針

現行サイトを維持したまま、

新サイトをVercel仮URLで確認する。

問題がなければ、

DNS設定を変更して本番公開する。

---

## MVPで実装するもの

公開TOPページ

営業カレンダー表示

管理画面

休みの日選択

今月の一言

ホームページ反映

画像保存

簡易ログイン

---

## MVPで実装しないもの

毎日の焼き上がり情報

売り切れ情報

リアルタイム在庫管理

予約機能

EC

会員機能

複数店舗管理

高度な認証

---

## 将来的な拡張

営業カレンダー機能の汎用化

イベント出店予定への転用

レッスン日管理への転用

複数デザインテンプレート

A4印刷用画像出力

---

## 判断基準

この構成はシンプルか。

---

月1回運用に合っているか。

---

ご夫婦が使えるか。

---

機能を増やしすぎていないか。

---

将来必要な部分だけ切り出せるか。

---

## まとめ

a little bakery+ のシステムは、

高機能なCMSではない。

---

お店の雰囲気を届け、

今月のお休みを伝え、

ご夫婦が無理なく続けられるための

小さなWebサイトである。
