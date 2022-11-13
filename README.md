# crm-api

証券会社向け顧客管理 API

## Overview

Node.js(Express) × Postgres で証券会社の顧客管理が可能

## Description

顧客データ：証券口座番号、メールアドレス、名前(first_name)、苗字(last_name)、住所、地域、郵便番号、国、、、

-   社員が顧客追加（口座番号は自動採番。かつユニークかつ必須）
-   社員が口座番号を指定して、口座情報を取得できる。氏名を指定して検索ができる
-   社員が証券口座番号を指定して検索をし、存在する場合は、情報の更新（全データ洗い替え）を行う。存在しない場合は、登録を行う。
-   証券口座番号を指定して検索をし、氏名を更新する。（PATCH）指定された項目を更新する -社員が口座番号を指定して、口座閉鎖（口座情報の削除）をできる

## Demo

## Requirement

## Usage

## Install

## Contribution

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

[tcnksm](https://github.com/tcnksm)
