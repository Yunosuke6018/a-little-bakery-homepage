# microcms_schema.md

# a little bakery+

## microCMS Schema

---

## このドキュメントの目的

このドキュメントは、

a little bakery+ のWebサイトで使用する microCMS のデータ設計を定義する。

---

目的は、

高機能なCMSを作ることではない。

---

月に一度、

今月のお休みを無理なく更新できること。

---

必要な店舗情報を安全に管理できること。

---

いつものパンを少しだけ紹介できること。

---

これらを実現するために、
必要最小限のデータだけを扱う。

---

# 基本方針

microCMSに入れる情報は最小限にする。

---

毎日更新が必要な情報は持たない。

---

売り切れ情報は持たない。

---

焼き上がり情報は持たない。

---

リアルタイム性を求めない。

---

# 初期MVPで使用するAPI

```txt
monthlySchedule
shopInfo
breads
```

---

# 1. monthlySchedule

## 用途

今月のお休みを管理する。

---

管理画面「お店のカレンダー」から更新する。

---

## API種別

リスト形式

---

## 理由

月ごとの営業カレンダーを履歴として残せるため。

---

## Fields

### year

型

Number

---

必須

true

---

例

2026

---

### month

型

Number

---

必須

true

---

例

6

---

### closedDays

型

Number配列

---

必須

true

---

例

```ts
[3, 10, 17, 24]
```

---

### monthlyMessage

型

TextArea

---

必須

false

---

例

今月もよろしくお願いします。

---

### publishedAt

型

Date

---

必須

false

---

## TypeScript Type

```ts
export type MonthlySchedule = {
  id: string;
  year: number;
  month: number;
  closedDays: number[];
  monthlyMessage?: string;
  publishedAt?: string;
};
```

---

# 2. shopInfo

## 用途

店舗情報を管理する。

---

営業時間や住所など、
変更頻度は低いがサイトに必要な情報を扱う。

---

## API種別

オブジェクト形式

---

## 理由

店舗情報は基本的に1件だけでよいため。

---

## Fields

### shopName

型

Text

---

必須

true

---

例

a little bakery+

---

### address

型

Text

---

必須

true

---

### businessHours

型

Text

---

必須

true

---

例

10:00〜18:00

---

### closedDaysText

型

Text

---

必須

false

---

例

不定休

---

### phoneNumber

型

Text

---

必須

false

---

### googleMapUrl

型

Text

---

必須

false

---

### instagramUrl

型

Text

---

必須

false

---

### parkingInfo

型

TextArea

---

必須

false

---

## TypeScript Type

```ts
export type ShopInfo = {
  shopName: string;
  address: string;
  businessHours: string;
  closedDaysText?: string;
  phoneNumber?: string;
  googleMapUrl?: string;
  instagramUrl?: string;
  parkingInfo?: string;
};
```

---

# 3. breads

## 用途

いつものパンを紹介する。

---

今日あるパンではなく、
お店の定番として紹介する。

---

## API種別

リスト形式

---

## Fields

### name

型

Text

---

必須

true

---

例

食パン

---

### image

型

Image

---

必須

false

---

### description

型

TextArea

---

必須

true

---

例

朝ごはんによく合います。

---

### displayOrder

型

Number

---

必須

true

---

### isVisible

型

Boolean

---

必須

true

---

初期値

true

---

## TypeScript Type

```ts
export type Bread = {
  id: string;
  name: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  description: string;
  displayOrder: number;
  isVisible: boolean;
};
```

---

# 初期MVPではCMS化しないもの

## Hero動画

初期は静的ファイルで管理する。

---

理由

頻繁に変更しないため。

---

## Heroコピー

初期はコード内で管理する。

---

コピー

小さなちいさなパン屋さん

---

理由

ブランドの核になるため、頻繁に変更しない。

---

## About本文

初期はコード内またはMarkdownで管理する。

---

理由

頻繁に変更しないため。

---

## デザイン設定

CMS化しない。

---

理由

ご両親が触る必要がないため。

---

# 将来的に追加を検討するAPI

## letters

お店からのお便り。

---

ただし初期MVPでは作らない。

---

理由

更新負荷が増えるため。

---

## seasonalItems

季節のパン。

---

ただし初期MVPでは作らない。

---

理由

リアルタイム更新に近づきすぎる可能性があるため。

---

# API設計の判断基準

この項目は本当に必要か。

---

月1回運用に必要か。

---

ご夫婦が入力する必要があるか。

---

更新負荷を増やしていないか。

---

サイトの目的に合っているか。

---

# やらないこと

毎日のパン情報をCMSで管理しない。

---

売り切れ情報を管理しない。

---

焼き上がり時間を管理しない。

---

商品在庫を管理しない。

---

複雑なカテゴリ管理をしない。

---

# まとめ

microCMSは、

サイトを高機能にするために使うのではない。

---

お店の人が、

月に一度だけ、

今月のお休みを無理なく更新できるようにするために使う。

---

管理する情報は少なくてよい。

---

少ないからこそ、
続けられる。
