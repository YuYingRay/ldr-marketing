# LDR 产品术语表（Product Terminology Glossary）

**本文件是 LDR 营销站（ldr-marketing）与产品应用（Lighting Design Rendering）两个仓库共用的术语唯一来源（single source of truth）。**

- 营销站 `src/i18n/ui.ts` 与产品应用 `public/locales/<lang>/*.json` 的翻译**必须遵循本表**；两边出现分歧时以本表为准，改本表 = 同步改两边。
- **新增术语先加到本表，再写进任一仓库的翻译文件。**
- `note` 列标注每种语言译法的来源：`ui.ts` = 直接取自营销站已发布翻译（权威，逐字复用）；`proposed` = 营销站尚无该词，本表首次提出，可讨论后改。`ui.ts (ja,ko) · proposed (de,tr,ar)` 表示混合来源。
- 规则：`LDR` 在所有语言中不翻译；套餐/品牌名（Free / Mini / Pro / Max / Small / Standard / Large / Creem / Alipay / Apple Pay / Google Pay）除 ui.ts 已本地化的语言外一律保留拉丁字母。
- 词条以 UI 长度为准，优先使用建筑照明从业者的行业用语。
- 已知的同语言内不一致译法见文末「待解决的不一致」。

生成日期：2026-08-27。依据：`ldr-marketing/src/i18n/ui.ts`（en/zh/ja/ko/de/ar/tr）与产品应用 `public/locales/{en,zh}/{common,auth,chat,canvas,gallery,generator,pricing}.json`。

## 一、品牌与功能模式

| key | en | zh | ja | ko | de | tr | ar | note |
|---|---|---|---|---|---|---|---|---|
| ldr | LDR | LDR | LDR | LDR | LDR | LDR | LDR | ui.ts；品牌名，任何语言不翻译、不加书名号 |
| product_tagline | Lighting Design Rendering | 灯光设计渲染 | 照明デザインレンダリング | 조명디자인 렌더링 | Lichtplanung & Nachtvisualisierung | Aydınlatma Tasarımı Görselleştirme | الإظهار الليلي لتصميم الإضاءة | ui.ts（og.siteName）；app zh 登录页用「灯光设计效果图」，需统一到本表 |
| lighting_design | Lighting design | 灯光设计 | 照明デザイン | 조명디자인 | Lichtplanung | Aydınlatma tasarımı | تصميم الإضاءة | ui.ts；de 用行业职业语 Lichtplanung 而非 Lichtdesign |
| mode_rendering | Rendering | 渲染 | レンダリング | 렌더링 | Rendering | Görselleştirme | الإظهار | ui.ts；主模式名（app 的 mode.rendering / inputBar.rendering） |
| mode_chat_agent | Chat Agent | Chat Agent | チャットエージェント | 챗 에이전트 | Chat-Agent | Chat Agent | Chat Agent | ui.ts（pricing.small.f3）；zh 保留英文（app 现状） |
| mode_canvas | Canvas | 画布 | キャンバス | 캔버스 | Canvas | Canvas | Canvas | ui.ts；画布编辑模式的简称 |
| canvas_editor | Canvas editor | 画布编辑器 | キャンバス編集 | 캔버스 편집 | Canvas-Editor | Canvas editörü | محرر Canvas | ui.ts（pricing.small.f3） |
| channel_diagram | Channel diagram | 通道图 | チャンネル図 | 채널 다이어그램 | Kanaldiagramm | Kanal diyagramı | مخطط القنوات | ui.ts (ja,ko,de,tr) · proposed (ar)；ar 的 ui.ts 现译「مخطط القنوات اللونية」实为「彩色通道图」，已移到下一条 |
| color_channel_diagram | Color channel diagram (material map) | 彩色通道图 / 材质图 | カラーチャンネル図 | 컬러 채널 다이어그램 | Farbkanaldiagramm | Renkli kanal diyagramı | مخطط القنوات اللونية | ui.ts (ar) · proposed (ja,ko,de,tr)；app 内「材质图」与「彩色通道图」指同一物 |
| hd_upscale | HD Upscale | 高清放大 | 高解像度化 | HD 업스케일 | HD-Upscaling | HD Yükseltme | تكبير عالي الدقة | proposed；app 独有（Real-ESRGAN） |
| library | Library | 作品库 | ライブラリ | 라이브러리 | Bibliothek | Kitaplık | المكتبة | proposed；app zh 现存 素材库/作品库/图库 三种，统一为「作品库」 |
| showcase | Showcase | 展示案例 | 生成事例 | 사례 | Beispiele | Örnekler | الأمثلة | ui.ts（showcase.heading / hero.examples 变体）；zh 营销站用「案例」 |
| gallery | Gallery | 案例库 | ギャラリー | 갤러리 | Galerie | Galeri | المعرض | ui.ts（hero.scrollGallery） |
| use_cases | Use cases | 应用场景 | 活用シーン | 활용 사례 | Anwendungen | Kullanım Alanları | مجالات الاستخدام | ui.ts |
| semantic_segmentation | Semantic segmentation | 语义分割 | セマンティックセグメンテーション | 시맨틱 세그멘테이션 | Semantische Segmentierung | Anlamsal Bölütleme | تجزئة دلالية | ui.ts（features.seg.title） |
| batch_generation | Batch generation | 批量生成 | バッチ生成 | 일괄 생성 | Stapelverarbeitung | Toplu üretim | توليد دفعي | ui.ts（pricing.pro.f2） |
| priority_queue | Priority generation queue | 优先生成队列 | 優先生成キュー | 우선 생성 대기열 | Priorisierte Warteschlange | Öncelikli üretim kuyruğu | أولوية في طابور التوليد | ui.ts（pricing.pro.f3） |
| api_access | API access | API 访问 | API アクセス | API 연동 | API-Zugang | API erişimi | وصول إلى واجهة البرمجة (API) | ui.ts（pricing.max.f3） |

## 二、图像与照明设计术语

| key | en | zh | ja | ko | de | tr | ar | note |
|---|---|---|---|---|---|---|---|---|
| day_photo | Day photo | 白天照片 | 昼間の写真 | 낮 사진 | Tagesfoto | Gündüz fotoğrafı | صورة نهارية | ui.ts；app 中「白天图」为其短形式，正式名用「白天照片」 |
| day_label | Day | 白天 | 昼 | 낮 | Tag | Gündüz | نهارًا | ui.ts（hero.day）；对比滑块/缩略标签 |
| night_label | Night | 夜晚 | 夜 | 밤 | Nacht | Gece | ليلًا | ui.ts（hero.night）；app gallery 用「夜景」，标签场景统一为「夜晚」 |
| nightscape_rendering | Nightscape rendering | 夜景效果图 | 夜景パース | 야경 렌더링 | Nachtvisualisierung | Gece görselleştirmesi | إظهار ليلي | ui.ts；见文末不一致（ja/de/zh 各有两种译法，此处取 hero.title 版本） |
| night_scene | Night scene | 夜景 | 夜景 | 야경 | Nachtszene | Gece sahnesi | مشهد ليلي | ui.ts (ja,ko) · proposed (de,tr,ar) |
| reference_image | Reference image | 参考图 | 参考画像 | 참고 이미지 | Referenzbild | Referans görseli | صورة مرجعية | proposed |
| original_image | Original | 原图 | 元画像 | 원본 | Original | Orijinal | الأصل | proposed |
| prompt | Prompt | 提示词 | プロンプト | 프롬프트 | Prompt | Prompt | الموجّه (Prompt) | proposed；app zh 混用「Prompt」与「提示词」，统一为「提示词」 |
| scene_type | Scene type | 场景类型 | シーンタイプ | 장면 유형 | Szenentyp | Sahne türü | نوع المشهد | proposed；Rendering 的 8 档场景预设 |
| lighting_proposal | Lighting design proposal | 灯光设计方案 | 照明デザイン提案 | 조명디자인 제안 | Lichtkonzept | Aydınlatma tasarım önerisi | مقترح تصميم الإضاءة | ui.ts (de) · proposed (ja,ko,tr,ar)；Chat Agent 的方案卡片 |
| brightness_hierarchy | Brightness hierarchy | 亮度秩序 | 輝度ヒエラルキー | 밝기 위계 | Helligkeitshierarchie | Parlaklık hiyerarşisi | تدرّج السطوع | proposed；L0–L5 |
| keep_dark | Keep dark | 留暗 | 暗部を残す | 어둠 유지 | Dunkel belassen | Karanlık bırak | إبقاء معتمًا | proposed |
| iterative_refinement | Iterative refinement (Canvas) | 画布迭代精修 | キャンバスでの反復調整 | 캔버스에서 반복 보정 | Iteratives Feintuning im Canvas | Canvas ile yinelemeli iyileştirme | تحسين تكراري على Canvas | ui.ts（pricing.standard.f2） |
| refine | Refine | 继续编辑 | 部分修正 | 세부 수정 | Verfeinern | İyileştir | تحسين | proposed；按钮短形式，语义承接上一条 |
| color_temperature | Color temperature | 色温 | 色温度 | 색온도 | Farbtemperatur | Renk sıcaklığı | درجة حرارة اللون | proposed；ja/ko/de 仅出现在 ui.ts 注释，正文未用 |
| illuminance | Illuminance | 照度 | 照度 | 조도 | Beleuchtungsstärke | Aydınlık düzeyi | شدة الاستضاءة | proposed；单位 lux |
| lighting_atmosphere | Lighting atmosphere | 照明氛围 | 照明の雰囲気 | 조명 분위기 | Lichtstimmung | Aydınlatma atmosferi | أجواء الإضاءة | proposed |
| lighting_method | Lighting method | 照明手法 | 照明手法 | 조명 기법 | Beleuchtungstechnik | Aydınlatma tekniği | أسلوب الإضاءة | proposed |
| fixture | Fixture (luminaire) | 灯具 | 器具 | 등기구 | Leuchte | Armatür | وحدة إنارة | ui.ts（useCases.subtitle 各语） |
| facade | Facade | 立面 | ファサード | 파사드 | Fassade | Cephe | واجهة | ui.ts；zh 营销站「幕墙」、app「建筑立面」两者都不准确，统一为行业通用「立面」 |
| uplighting | Uplighting | 上照 | アッパーライト | 업라이팅 | Anstrahlung | Yukarı aydınlatma | إضاءة صاعدة | ui.ts（useCases.landscape.desc） |
| structure_fidelity | Structure fidelity | 结构保真 | 構造の忠実度 | 구조 충실도 | Strukturtreue | Yapısal doğruluk | الحفاظ على البنية | proposed |
| watermark | Watermark | 水印 | ウォーターマーク | 워터마크 | Wasserzeichen | Filigran | علامة مائية | ui.ts |
| resolution_4k | 4K (4096px) | 4K | 4K | 4K | 4K | 4K | 4K | ui.ts；数字不本地化 |
| architectural_lighting | Architectural lighting | 建筑照明 | 建築照明 | 건축조명 | Architekturbeleuchtung | Mimari Aydınlatma | إضاءة العمارة | ui.ts（useCases.arch.title） |
| landscape_lighting | Landscape lighting | 景观照明 | ランドスケープ照明 | 조경조명 | Landschaftsbeleuchtung | Peyzaj Aydınlatması | إضاءة المواقع والحدائق | ui.ts（useCases.landscape.title） |
| urban_night_planning | Urban night planning | 城市夜景规划 | 都市夜景計画 | 야간경관 계획 | Städtische Nachtplanung | Kentsel Gece Planlaması | التخطيط الليلي للمدن | ui.ts；ko 刻意用法定术语「야간경관 계획」 |
| hospitality_lighting | Hospitality lighting | 酒店照明 | ホスピタリティ照明 | 호스피탈리티 조명 | Hotellerie & Gastronomie | Konaklama Aydınlatması | إضاءة الضيافة | ui.ts（useCases.hospitality.title） |

## 三、积分、套餐与支付

| key | en | zh | ja | ko | de | tr | ar | note |
|---|---|---|---|---|---|---|---|---|
| credits | Credits | 积分 | クレジット | 크레딧 | Credits | Kredi | رصيد | ui.ts；app zh pricing.json 混用英文「credits」，统一为「积分」 |
| credits_never_expire | Credits never expire | 积分永久有效 | クレジットは無期限有効 | 크레딧 소멸 없음 | Credits verfallen nie | Krediler süresiz | الرصيد لا ينتهي | ui.ts；对外承诺条款，措辞不可弱化 |
| daily_free_render | Daily free render | 每日 1 次免费渲染 | 毎日 1 回無料レンダリング | 매일 1회 무료 렌더링 | 1 kostenloses Rendering pro Tag | Her gün 1 ücretsiz görselleştirme | إظهار مجاني واحد يوميًا | ui.ts（cta.note）；见文末 render/generation 不一致 |
| signup_credits | Signup credits | 注册送积分 | 登録時クレジット付与 | 가입 시 크레딧 지급 | Credits bei der Anmeldung | Kayıtta kredi | أرصدة عند التسجيل | ui.ts（pricing.free.f1 变体） |
| project_pack | Project pack | 项目包 | プロジェクトパック | 프로젝트 패키지 | Projektpaket | Proje paketi | باقة مشروع | ui.ts（pricing.packSection） |
| subscription | Subscription | 订阅 | 月額プラン | 구독 | Abonnement | Abonelik | اشتراك | ui.ts；ja 站内一律译作「月額プラン」（非サブスクリプション），沿用 |
| free_trial | Free trial | 免费试用 | 無料トライアル | 무료 체험 | Kostenloser Test | Ücretsiz deneme | التجربة المجانية | ui.ts（pricing.subSection） |
| tier_free | Free | 免费版 | Free | Free | Free | Free | Free | ui.ts；仅 zh 本地化；app zh 用「免费体验」，需统一 |
| tier_mini | Mini | 迷你包 | Mini | Mini | Mini | Mini | Mini | ui.ts；zh 见文末不一致（名称 迷你包 vs CTA「购买 Mini」） |
| tier_pro | Pro | 专业版 | Pro | Pro | Pro | Pro | Pro | ui.ts；app zh「Pro 专业版」 |
| tier_max | Max | 旗舰版 | Max | Max | Max | Max | Max | ui.ts；app zh「Max 旗舰版」 |
| pack_small | Small | 小型包 | Small | Small | Small | Small | Small | ui.ts；app en「Small Project」/ zh「Small 小项目」 |
| pack_standard | Standard | 标准包 | Standard | Standard | Standard | Standard | Standard | ui.ts；app en「Standard Project」/ zh「Standard 标准项目」 |
| pack_large | Large | 大型包 | Large | Large | Large | Large | Large | ui.ts；app en「Large Project」/ zh「Large 大项目」 |
| one_time | One-time | 一次性 | 買い切り | 1회 결제 | einmalig | tek seferlik | دفعة واحدة | ui.ts（pricing.period.oneTime） |
| per_month | / month | / 月 | /月 | /월 | /Monat | /ay | شهريًا | ui.ts（pricing.period.month） |
| billing_cycle | Billing cycle | 计费周期 | 請求サイクル | 결제 주기 | Abrechnungszyklus | Fatura dönemi | دورة فوترة | ui.ts（faq.a4）；de 见文末不一致 |
| cancel_anytime | Cancel anytime | 随时取消 | いつでも解約可 | 언제든 해지 | Jederzeit kündbar | İstediğiniz zaman iptal | ألغِ في أي وقت | ui.ts；app zh「随时 cancel」需改为「随时取消」 |
| customer_portal | Customer portal | 客户门户 | カスタマーポータル | 고객 포털 | Kundenportal | Müşteri portalı | بوابة العملاء | ui.ts（faq.a5） |
| manage_subscription | Manage subscription | 管理订阅 | 契約を管理 | 구독 관리 | Abo verwalten | Aboneliği yönet | إدارة الاشتراك | proposed；app 按钮 |
| insufficient_credits | Not enough credits | 积分不足 | クレジット不足 | 크레딧 부족 | Nicht genügend Credits | Yetersiz kredi | الرصيد غير كافٍ | proposed；paywall 标题 |
| current_plan | Current plan | 当前方案 | 現在のプラン | 현재 플랜 | Aktueller Tarif | Mevcut plan | الباقة الحالية | proposed |
| merchant_of_record | Merchant of Record | 责任商户 | Merchant of Record（販売事業者） | 판매 사업자(Merchant of Record) | Merchant of Record | Kayıtlı satıcı | التاجر المسجَّل | ui.ts（faq.a7） |
| creem | Creem | Creem | Creem | Creem | Creem | Creem | Creem | ui.ts；法务语境写全称「Creem Inc.」 |
| alipay | Alipay | 支付宝 | Alipay | Alipay | Alipay | Alipay | Alipay | ui.ts (tr,ar) · proposed (ja,ko,de)；ja/ko/de 站刻意不提支付宝；仅一次性购买可用，不得与订阅并列 |
| apple_pay | Apple Pay | Apple Pay | Apple Pay | Apple Pay | Apple Pay | Apple Pay | Apple Pay | ui.ts |
| google_pay | Google Pay | Google Pay | Google Pay | Google Pay | Google Pay | Google Pay | Google Pay | ui.ts |
| card_payment | Card | 银行卡 | クレジットカード | 신용카드 | Kreditkarte | Kart | بطاقة | ui.ts（pricing.subtitle）；订阅唯一支付渠道之一 |
| refund_policy | Refund Policy | 退款政策 | 返金ポリシー | 환불 정책 | Rückerstattungsrichtlinie | İade Politikası | سياسة الاسترداد | ui.ts；de 见文末不一致（footer 用 Rückerstattung） |
| terms_of_service | Terms of Service | 服务条款 | 利用規約 | 이용약관 | Nutzungsbedingungen | Kullanım Koşulları | شروط الخدمة | ui.ts |
| privacy_policy | Privacy Policy | 隐私政策 | プライバシーポリシー | 개인정보처리방침 | Datenschutz | Gizlilik Politikası | سياسة الخصوصية | ui.ts |
| referral | Invite friends (referral) | 邀请好友 | 友達を招待 | 친구 초대 | Freunde einladen | Arkadaş davet et | دعوة الأصدقاء | proposed；app 侧边栏推荐计划 |
| billing | Billing | 账单 | 請求 | 결제 | Abrechnung | Faturalama | الفوترة | proposed |

## 四、常用动作与状态词

| key | en | zh | ja | ko | de | tr | ar | note |
|---|---|---|---|---|---|---|---|---|
| upload | Upload | 上传 | アップロード | 업로드 | Hochladen | Yükle | رفع | ui.ts（how.step1.title；tr/ar 原文为祈使变体） |
| generate | Generate | 生成 | 生成 | 생성 | Generieren | Üret | توليد | ui.ts（pricing.free.f2 名词变体） |
| regenerate | Regenerate | 重新生成 | 再生成 | 다시 생성 | Neu generieren | Yeniden üret | إعادة التوليد | proposed |
| render_verb | Render | 渲染 | レンダリング | 렌더링 | Rendern | Görselleştir | إظهار | ui.ts（how.step3.title） |
| describe | Describe | 描述 | 指示する | 설명 | Beschreiben | Tarif Et | صف الإضاءة | ui.ts（how.step2.title） |
| download | Download | 下载 | ダウンロード | 다운로드 | Herunterladen | İndir | تنزيل | proposed |
| confirm | Confirm | 确认 | 確認 | 확인 | Bestätigen | Onayla | تأكيد | proposed |
| cancel | Cancel | 取消 | キャンセル | 취소 | Abbrechen | Vazgeç | إلغاء | proposed；区别于「取消订阅」用 解約/해지/kündigen/iptal |
| retry | Retry | 重试 | 再試行 | 다시 시도 | Erneut versuchen | Yeniden dene | إعادة المحاولة | proposed |
| processing | Processing... | 处理中... | 処理中… | 처리 중... | Wird verarbeitet … | İşleniyor... | جارٍ المعالجة... | proposed |
| generating | Generating... | 生成中... | 生成中… | 생성 중... | Wird generiert … | Üretiliyor... | جارٍ التوليد... | proposed |
| uploading | Uploading... | 上传中... | アップロード中… | 업로드 중... | Wird hochgeladen … | Yükleniyor... | جارٍ الرفع... | proposed |
| completed | Completed | 已完成 | 完了 | 완료 | Abgeschlossen | Tamamlandı | مكتمل | proposed |
| failed | Failed | 失败 | 失敗 | 실패 | Fehlgeschlagen | Başarısız | فشل | proposed |
| share | Share | 分享 | 共有 | 공유 | Teilen | Paylaş | مشاركة | proposed；投稿到首页展示案例 |
| try_free | Try free | 免费试用 | 無料で試す | 무료 체험 | Kostenlos testen | Ücretsiz Dene | جرّب مجانًا | ui.ts（nav.tryFree） |
| get_started_free | Get started free | 免费开始 | 無料で始める | 무료로 시작하기 | Kostenlos starten | Ücretsiz Başlayın | ابدأ مجانًا | ui.ts（cta.button） |

## 待解决的不一致（同一语言内、同一概念、两种译法）

以下均来自 ui.ts 或 app 现状，本表已选定其中一种（见对应行），请 owner 确认后回改源文件。

| 语言 | 概念 | 译法 A | 译法 B | 出处 | 本表取 |
|---|---|---|---|---|---|
| en | daily free render | free render | free generation | cta.note / pricing.free.f2 | Daily free render |
| en | pack tier names | Mini / Small / Standard / Large | Mini Starter / Small Project / Standard Project / Large Project | ui.ts / app pricing.json | 短名 |
| zh | nightscape rendering | 夜景效果图 | 夜景渲染图 / 夜景渲染 | hero.title / hero.subtitle / how.step3 | 夜景效果图 |
| zh | Mini（及其他套餐名） | 迷你包 / 专业版 / 旗舰版 | Mini / Pro / Max（CTA 与 FAQ） | pricing.*.name vs pricing.*.cta、faq.a2 | 沿用 name 列，建议改为纯拉丁 |
| zh | Free | 免费版 | 免费体验 | ui.ts / app pricing.json | 免费版 |
| zh | Library | 素材库 | 作品库 / 图库 | app common+gallery / canvas / common.replayLibrary | 作品库 |
| zh | facade | 幕墙 | 建筑立面 | ui.ts useCases / app canvas.role.facade | 立面 |
| zh | prompt | Prompt | 提示词 | app gallery / generator | 提示词 |
| zh | credits | 积分 | credits | app auth+common / app pricing.json | 积分 |
| zh | cancel anytime | 随时取消 | 随时 cancel | ui.ts / app pricing.json | 随时取消 |
| zh | product tagline | 灯光设计渲染 | 灯光设计效果图 | ui.ts og.siteName / app auth+gallery.home.title | 灯光设计渲染 |
| ja | nightscape rendering | 夜景パース | 夜景レンダリング | hero.title / hero.altNight, showcase.emptyDesc | 夜景パース |
| ja | Chat Agent | チャットエージェント | チャット | pricing.small.f3 / pricing.free.f4 | チャットエージェント（短形式仅限并列列表） |
| ja | daily free | 無料レンダリング | 無料で生成 | cta.note / pricing.free.f2 | 無料レンダリング |
| ja | subscription | 月額プラン | 月額契約 | pricing.subSection / pricing.packSectionDesc | 月額プラン |
| ko | daily free | 무료 렌더링 | 무료 생성 | cta.note / pricing.free.f2 | 무료 렌더링 |
| ko | priority queue | 우선 생성 대기열 | 우선 대기열 | pricing.pro.f3 / pricing.max.f2 | 우선 생성 대기열 |
| ko | Chat Agent | 챗 에이전트 | 챗 | pricing.small.f3 / pricing.free.f4 | 챗 에이전트 |
| de | nightscape rendering | Nachtvisualisierung | Nachtrendering | hero.title / hero.subtitle, how.step3.desc | Nachtvisualisierung |
| de | day photo | Tagesfoto | Tagesaufnahme | hero.subtitle / hero.altDay, faq.a8 | Tagesfoto |
| de | Refund Policy | Rückerstattung | Rückerstattungsrichtlinie | footer.refund / faq.a6.link | Rückerstattungsrichtlinie |
| de | billing cycle | Abrechnungszyklus | Abrechnungsperiode | faq.a4 / faq.a5, pricing.disclaimer | Abrechnungszyklus |
| de | daily free | Rendering | Generierung | cta.note / pricing.free.f2 | Rendering |
| de | priority queue | Priorisierte Warteschlange | Priorität | pricing.pro.f3 / pricing.max.f2 | Priorisierte Warteschlange |
| tr | rendering | görselleştirme | render | hero.* / meta.pricing.desc, blog.subtitle | görselleştirme |
| tr | daily free | görselleştirme | üretim | cta.note / pricing.free.f2 | görselleştirme |
| ar | rendering | إظهار | تصوّر | hero.* / meta.home.desc | إظهار |
| ar | channel diagram | مخطط القنوات اللونية（字面 = 彩色通道图） | — | pricing.standard.f3, pricing.large.f2 | 拆为 مخطط القنوات（通道图）与 مخطط القنوات اللونية（彩色通道图） |
