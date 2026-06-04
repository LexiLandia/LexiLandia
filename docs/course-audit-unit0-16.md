# LexiLand Course Audit: Unit 0-16

## Summary

- Общая оценка курса: курс уже выглядит как рабочая статическая система для нулевого уровня. Есть непрерывная цепочка `Урок 0` -> `Урок 48`, отдельные top-level юниты 1-16, много аудио, визуальных сцен, карт и игр. Самая сильная сторона - обучение через действие: выбор, движение по карте, сцены, короткие тексты и повторение.
- Главные сильные стороны: почти все темы подаются через готовые фразы, а не через правила; старые слова регулярно возвращаются; уроки и игры разделены на отдельные кнопки; аудио-пути закрыты полностью; learner UI по автоматическому скану не содержит английских learner-текстов.
- Главные слабые места: Level 0 местами требует письма/копирования, хотя курс в целом лучше работает как input-first; поздние юниты быстро накапливают скрытые падежные формы; часть игр по смыслу близка к quiz-проверке и нуждается в большем контексте; в source-data много заданий, где правильный ответ стоит первым, хотя рендереры перемешивают ответы на экране.
- Самые срочные улучшения: заменить письменные copy-задачи в Level 0 на распознавание/выбор; добавить больше visual-before-question в ранние юниты; проверить source-order правильных ответов в данных; усилить мосты между Unit 8 -> Unit 9 и Unit 12 -> Unit 13.
- Что не надо трогать: текущую архитектуру статического сайта, разделение top-level юнитов, систему аудио-путей, карточки уроков/игр, progress/localStorage, базовые карты и существующие игровые рендереры.

Техническая картина аудита:

- Runtime-структура: уроки `0-48` присутствуют без пропусков.
- Top-level объектов данных: `19`, включая отдельные Lesson 0-3 и Unit 2-16; в UI они группируются через Unit 1 shell.
- Внутренних playable-кнопок: `137`.
- Audio plan: `1541` аудио-ссылок, `missing: 0`.
- Автоматический learner-Latin scan: `0` learner-facing строк с латиницей в проверенных полях.
- Source-order scan: `474` вопроса/задачи имеют correct первым в исходных данных; learner-facing риск снижен, потому что рендереры перемешивают ответы.

## Global Issues

- Навигация: логика top-level юнитов правильная. Unit 1 виртуально собирает Lesson 0-3; Unit 2-16 являются отдельными блоками. Это хорошо и не требует перестройки.
- Прогресс: текущая система прогресса достаточно сильная для статического сайта. Важный будущий шаг - отдельный QA-сценарий восстановления progress после reload в середине длинной игры.
- Аудио: технически аудио-пути закрыты. Методически надо следить, чтобы ключевые экраны не превращались в чтение без обязательного прослушивания.
- Emoji/визуал: покрытие хорошее, но для абстрактных или похожих слов emoji иногда недостаточно. Особенно это заметно в темах `кафе/кофе`, одежда, здоровье, город.
- Сложность: ранние юниты идут мягко, но Unit 6-8 резко увеличивают количество скрытых форм (`в коробке`, `в коробку`, `под столом`, `две книги`, `много мячей`). Это допустимо как chunks, но требует больше повторения.
- Повторяемость: повторение сильное, но часть игр повторяет формат "картинка -> выбрать слово". Для удержания полезно чаще добавлять действие: двигаться, положить, найти, собрать сцену.
- Мобильный UX: большинство экранов спроектированы под один экран, но карты и большие option grids остаются главной зоной риска. Нужен регулярный визуальный mobile playtest.
- Карты: карты - одна из лучших частей курса. Риск: если цель слишком очевидна визуально, ученик может играть без чтения. Команды должны оставаться главным источником действия.
- Мини-истории: хорошие и короткие. Позже стоит добавить больше story-review между блоками 8-12 и 13-16.
- Learner UI: английский в learner-полях автоматическим сканом не найден. README/docs не считаются learner UI.

## Unit-by-unit audit

### Unit 0: Урок 0. Учимся читать

- Goal: дать старт чтению кириллицы: буквы, слоги, первые слова, мини-тексты.
- Works well: сильная структура от букв к словам; много коротких карточек; есть кликабельные слова и аудио; мини-тексты дают ощущение настоящего чтения.
- Problems: есть copy/write-практика (`copy` в данных). Для абсолютного beginner и текущей философии input-first это слишком рано.
- Logic risks: некоторые блоки букв дают много символов подряд; ученик может начать угадывать форму без звука.
- Task quality: распознавание букв/слогов полезное; copy-задачи лучше заменить на "выбери такой же", "найди слог", "слушай и выбери".
- Game quality: это скорее bootcamp-слайды, чем игра; для Unit 0 это нормально.
- Russian language issues: критичных языковых проблем не видно.
- Visual/context issues: буквы и слоги требуют больше mouth/audio support, потому что emoji не всегда объясняет звук.
- Recommended fixes: P1 - убрать обязательный ввод текста; замедлить/разнести слоги и слова паузами там, где аудио ещё звучит слишком быстро.
- Recommended expansions: добавить 1) "слушай букву", 2) "найди слог", 3) "слово распалось: ма + ма".
- Priority: P1.

### Unit 1: Стартовые слова, место, первое чтение

- Goal: дать базовые survival-слова `да`, `нет`, `здесь`, `там`, `это`, затем простые чтения `мама`, `дом`, `там`.
- Works well: Lesson 1 хорошо вводит слова через звук/emoji/действие; Lesson 2 даёт `где?`; Lesson 3 даёт ощущение "я читаю русские слова".
- Problems: Unit 1 очень широкий: survival vocabulary, location и reading в одном shell. Это нормально для MVP, но требует аккуратной навигации.
- Logic risks: в Lesson 1 много interaction подряд; часть задач может стать механической, если аудио не включается автоматически/часто.
- Task quality: tap/choice/location/mini-game дают хороший микс.
- Game quality: мини-игра Lesson 1 и reading game Lesson 3 полезны, но Lesson 2 map game можно усилить задачами на `где?`, а не только movement.
- Russian language issues: стоит следить за формами типа `одно яблоко`, `два яблока`; ранее такая проблема уже всплывала.
- Visual/context issues: concept `здесь/там` лучше всего работает с большой картинкой/пространством; этот элемент надо сохранять.
- Recommended fixes: P1 - больше аудио-first в заданиях "Что это?"; P2 - разделить повторение reading и survival в короткие review blocks.
- Recommended expansions: mini-review "слушай и покажи: здесь/там"; карта с двумя зонами; короткая история "Я здесь. Дом там."
- Priority: P1.

### Unit 2: Кто? Что? Маленький мир

- Goal: научить различать `кто?` и `что?`, людей/животных/предметы, простые сцены `здесь/там`.
- Works well: Unit 2 исправляет важную методическую линию: люди и животные идут через `кто?`, предметы через `что?`. Уроки 4-6 дают хороший bridge от отдельных слов к микротекстам.
- Problems: урок "Что?" должен избегать животных как `что`; если будущие расширения добавят кот/собака туда как предметы, это будет методическая ошибка.
- Logic risks: слово `и` появляется просто и правильно, но пары могут стать чистым сопоставлением emoji без чтения.
- Task quality: вопросы короткие и понятные; визуалы достаточные.
- Game quality: Unit 2 map game хорош как переход к action learning.
- Russian language issues: критичных проблем нет; chunks `мама и папа`, `кот и собака` звучат естественно.
- Visual/context issues: для `кто?` нужен человек/животное, для `что?` нужен предметный контейнер/объект.
- Recommended fixes: P2 - добавить больше сцен, где один и тот же вопрос меняется по контексту (`Кто здесь?`, `Что здесь?`).
- Recommended expansions: "живое/неживое" без термина; family/person mini-scene; object room scene.
- Priority: P2.

### Unit 3: Что делает? Маленький мир живёт

- Goal: действия людей и животных: `спит`, `сидит`, `идёт`, `ест`, `пьёт`, `читает`, `играет`, плюс `не` и `видит`.
- Works well: очень сильная тема для natural approach: learner видит сцену и действие. Game 3 "Живой мир" хорошо соединяет движение и действие.
- Problems: `не` и `видит` вводятся вместе с повторением многих действий; это может быть плотновато.
- Logic risks: если scene emoji слишком очевиден, игра может стать "выбери emoji", а не чтение команды.
- Task quality: action-choice и yes/no работают на цель.
- Game quality: 2D map "Живой мир" - сильный формат; его стоит использовать как образец для следующих action units.
- Russian language issues: `что делает?` как готовый вопрос уместен; не надо объяснять спряжение.
- Visual/context issues: действия должны быть буквально видны, особенно `сидит/стоит`, где emoji могут быть похожи.
- Recommended fixes: P2 - добавить contrast slides `спит / не спит`, `идёт / стоит`.
- Recommended expansions: "театр действий"; "найди, кто читает"; короткая story с 3 персонажами.
- Priority: P2.

### Unit 4: Я хочу. Дай. У меня есть

- Goal: первые личные survival chunks: желание, просьба, наличие/отсутствие.
- Works well: тема очень полезная; связь `я хочу` -> `дай` -> `на` -> `спасибо` естественная.
- Problems: `у меня нет` требует сложных форм (`мяча`, `воды`, `книги`). Как chunk это допустимо, но нужно больше визуального контраста.
- Logic risks: learner может не отличать `я хочу` от `дай`, если оба сводятся к выбору предмета.
- Task quality: выбор предмета и yes/no понятны.
- Game quality: "Магазин" хорош, но может стать ещё сильнее как role-play с этапами.
- Russian language issues: формы `нет мяча`, `нет воды`, `нет книги` правильные, но скрыто сложные.
- Visual/context issues: `есть/нет` нужно всегда показывать через inventory/empty inventory.
- Recommended fixes: P1 - добавить больше сцен, где `хочу` не равно `есть`: "нет воды -> хочу воду".
- Recommended expansions: попроси друга; мини-кафе; инвентарь рюкзака.
- Priority: P1.

### Unit 5: Иди. Вверх, вниз, налево, направо

- Goal: читать команды движения и действовать на карте.
- Works well: один из сильнейших юнитов. Движение делает русский физическим; secret picture - удачная mechanics-based практика.
- Problems: команды с числами и шагами должны быть абсолютно чистыми по формам (`два шага`, `три шага`). Такие ошибки быстро ломают доверие.
- Logic risks: если маршрут слишком длинный, learner теряет связь с русской командой и начинает играть на память.
- Task quality: direction tasks, step tasks и destination tasks работают на цель.
- Game quality: secret picture и map command дают настоящую игру, а не quiz.
- Russian language issues: следить за `направо два шага`, `налево три шага`, `иду/еду` не смешивать.
- Visual/context issues: стрелки должны быть крупнее текста на ранних экранах, потом текст может стать главным.
- Recommended fixes: P1 - audit всех route commands на `шаг/шага`; P2 - добавить preview "читай -> нажми -> линия".
- Recommended expansions: маршрут домой; лабиринт с дверью; диктант по клеткам.
- Priority: P1.

### Unit 6: Где? В, на, под, рядом

- Goal: понять location chunks: `в`, `на`, `под`, `рядом`, простые room/object positions.
- Works well: тема очень визуальная; room game и placement game хорошо связывают command -> action -> result phrase.
- Problems: есть переход между command form и result form: `Книга — в коробку` -> `Книга в коробке`. Это методически полезно, но сложно.
- Logic risks: `в/на/под/рядом` нельзя оставлять только словом; каждый экран должен иметь сильную spatial картинку.
- Task quality: "Где кот?" и "Положи предмет" тренируют смысл.
- Game quality: "Комната" - правильное направление, потому что добавляет сцену, а не отдельные карточки.
- Russian language issues: `в коробку/в коробке`, `на стол/на столе`, `под столом` правильные как chunks, но не должны объясняться грамматически.
- Visual/context issues: emoji alone слабее, чем CSS-position scene. Для `в` особенно важно показать inside.
- Recommended fixes: P1 - добавить больше result-screen после command: "Ты положил. Мяч на столе."
- Recommended expansions: шкаф/кровать позже; игра "где спрятано?"; короткая комната-история.
- Priority: P1.

### Unit 7: Какой? Большой, маленький, цвета

- Goal: понимать size/color descriptions и искать предмет по описанию.
- Works well: Unit 7 хорошо соединяет visual adjectives с предметами и повторяет движение/место через цветную карту.
- Problems: много форм прилагательных (`красный/красная/красное`, `синий/синяя/синее`) без объяснения. Это правильно для подхода, но требует огромного visual repetition.
- Logic risks: learner может запомнить цвет emoji, но не прочитать форму слова.
- Task quality: size/color/find/phrase/map tasks работают на цель.
- Game quality: "Цветная карта" сильнее простых quiz-игр; "Что изменилось?" полезно для внимания.
- Russian language issues: важно постоянно проверять согласование: `синяя книга`, `зелёное яблоко`, `белые носки`.
- Visual/context issues: CSS-цвет предмета должен быть очевиднее emoji цвета.
- Recommended fixes: P2 - добавить больше "один предмет - разные цвета" перед смешанными сценами.
- Recommended expansions: одежда подготовка к Unit 11; "найди пару"; "что изменилось" с местом + цветом.
- Priority: P2.

### Unit 8: Сколько? Один, два, три

- Goal: количество 1-5 и `много/мало` через предметные группы.
- Works well: очень нужная тема; хорошо связана с Unit 4 магазином и Unit 5 картой.
- Problems: скрытая грамматика количества тяжёлая: `одна книга`, `одно яблоко`, `две книги`, `много мячей`.
- Logic risks: learner может считать emoji без чтения фразы. Нужны audio-first и phrase-choice rounds.
- Task quality: counting, find quantity, basket, shop count, map count закрывают разные навыки.
- Game quality: корзина и магазин 2 особенно полезны, потому что количество используется с действием.
- Russian language issues: следить за `один/одна/одно`, `два/две`, plural forms.
- Visual/context issues: группы 4-5 объектов не должны быть мелкими на телефоне.
- Recommended fixes: P1 - больше contrast для `два мяча / две книги`; P2 - добавить listening-only count rounds.
- Recommended expansions: "дай два"; "положи три"; мини-история со столом.
- Priority: P1.

### Unit 9: Мой день

- Goal: собрать предыдущие темы в маленькие истории про утро, день и вечер.
- Works well: это важный интеграционный юнит. Мини-истории короткие, время дня понятно, повторяются место/действие/количество.
- Problems: это первый большой synthesis unit, поэтому часть learners может почувствовать скачок: теперь надо понимать сюжет, а не одно слово.
- Logic risks: time-of-day может быть угадан по visual, если текст не нужен для ответа.
- Task quality: mini-story questions полезные и не перегружены.
- Game quality: "Карта дня" хорошо соединяет movement + story context.
- Russian language issues: `утром/днём/вечером` лучше держать как chunks, без объяснения.
- Visual/context issues: нужны явные time backgrounds: солнце/вечер/дом/школа.
- Recommended fixes: P2 - добавить recap slide "утро -> день -> вечер" перед играми.
- Recommended expansions: день ученика; история с выбором маршрута; повторение Unit 8 в сценах стола.
- Priority: P2.

### Unit 10: Еда и напитки

- Goal: бытовые фразы про еду, напитки, `я ем`, `я пью`, кафе.
- Works well: тема практичная; хорошо использует Unit 4 (`я хочу`, `дай`, `спасибо`) и Unit 9 (`утро/день/кафе`).
- Problems: `еда/напиток` как категории могут быть слишком abstract без strong visual grouping.
- Logic risks: "суп" может восприниматься как drink по visual чашки, если картинка не ясная.
- Task quality: food/drink categorization, cafe order, table building полезны.
- Game quality: "Кафе" и "Собери стол" сильные; "Еда или напиток" проще, но нужен как быстрый classification.
- Russian language issues: формы `пью воду`, `ем кашу`, `дай суп` естественные.
- Visual/context issues: каша/суп/чай/кофе должны иметь отличимые visuals.
- Recommended fixes: P2 - добавить scene context для `суп/каша` как bowl/plate, а не просто emoji.
- Recommended expansions: завтрак/обед; кафе role-play; заказ из 2 предметов.
- Priority: P2.

### Unit 11: Одежда и цвета

- Goal: одежда, цветная одежда, possession/shop/clothing map.
- Works well: логично продолжает Unit 7 colors и Unit 4 shop/request.
- Problems: некоторые emoji одежды похожи или зависят от платформы; learner может путать `шапка`, `обувь`, `носки`.
- Logic risks: цвет + одежда требует правильных форм (`красная футболка`, `чёрная куртка`, `белые носки`), а форм много.
- Task quality: what/find/color/have/shop/build/map дают хороший набор.
- Game quality: 7 игр - богато, но есть риск однотипности find/choose.
- Russian language issues: надо внимательно следить за plural `носки`, `белые носки`.
- Visual/context issues: одежду лучше постепенно заменить на собственные картинки, потому что emoji не всегда стабильны.
- Recommended fixes: P1 - визуально усилить одежду локальными картинками или CSS карточками; P2 - больше body-context "надень".
- Recommended expansions: погода -> одежда bridge; closet scene; outfit builder.
- Priority: P1.

### Unit 12: Погода

- Goal: погода, ощущения на улице, выбор одежды по погоде.
- Works well: очень жизненная тема, хорошо соединяется с Unit 11 одеждой и Unit 5 movement.
- Problems: переход от погоды к body/health в Unit 13 требует мостика: холодно/плохо/болит.
- Logic risks: weather emoji могут быть очевидными, и learner не читает фразу `Сегодня дождь`.
- Task quality: find weather, phrase weather, clothing by weather полезны.
- Game quality: weather map и clothing/weather tasks дают действие.
- Russian language issues: `на улице холодно/мокро/сухо` звучит естественно.
- Visual/context issues: дождь/снег/ветер нужно показывать не только emoji, но и background state.
- Recommended fixes: P2 - добавить больше yes/no по сцене: `На улице снег?`.
- Recommended expansions: "что надеть?"; weather route; morning weather mini-story.
- Priority: P2.

### Unit 13: Тело и здоровье

- Goal: части тела, простые состояния, `болит`, просьба/помощь.
- Works well: полезная survival-тема; Unit 12 погода и Unit 4 просьбы помогают контексту.
- Problems: `у меня болит...` вводит сложный chunk, а тема чувствительная. Нужны очень ясные visuals и мягкая обратная связь.
- Logic risks: body-part tasks могут стать memorization без ситуации; health phrases должны быть в реальных мини-сценах.
- Task quality: show body part, pain/feel, help tasks полезны.
- Game quality: "Помоги" и карта здоровья сильнее, чем простое "что это?".
- Russian language issues: `болит голова`, `болит живот`, `болит нога/рука` корректно как chunks.
- Visual/context issues: голова/живот/рука/нога хорошо emoji-поддержаны; `мне хорошо/плохо` требует facial expression.
- Recommended fixes: P1 - усилить situation slides: кто плохо себя чувствует и что нужно.
- Recommended expansions: doctor/help scene; choose help item; short dialogue "Мне плохо. Дай воду."
- Priority: P1.

### Unit 14: Семья и люди

- Goal: family words, possession family, who does what.
- Works well: сильная тема для эмоционального контекста; хорошо повторяет Unit 2 people и Unit 3 actions.
- Problems: family vocabulary быстро растёт: мама/папа/брат/сестра/бабушка/дедушка/друг/подруга.
- Logic risks: если все family members представлены emoji-only, часть различий размывается.
- Task quality: who/is/have/action/scene tasks работают на цель.
- Game quality: "Семейная сцена", "Помоги семье", "Карта семьи" дают полезные situations.
- Russian language issues: `мой/моя`, `у меня есть брат/сестра` нужно держать как chunks.
- Visual/context issues: для бабушки/дедушки/брата/сестры нужны более явные картинки в будущем.
- Recommended fixes: P2 - больше маленьких family stories вместо отдельных карточек.
- Recommended expansions: family at home; ask/help family member; family map.
- Priority: P2.

### Unit 15: Дом и комнаты

- Goal: rooms, home objects, where things/people are inside a house.
- Works well: отлично использует Unit 6 location и Unit 14 family; home-room scenes полезны.
- Problems: много новых household nouns; часть emoji/visual может быть тесной на телефоне.
- Logic risks: `на кухне`, `в комнате`, `в ванной`, `у окна`, `у двери` - сильные chunks, но их много.
- Task quality: what/where/find room/map tasks логичны.
- Game quality: room scene и home map хорошо учат через пространство.
- Russian language issues: формы `на кухне`, `в комнате`, `в ванной`, `у двери`, `у окна` корректны, но требуют repetition.
- Visual/context issues: комнаты лучше всего работают как plans/rooms, не как одиночные emoji.
- Recommended fixes: P1 - добавить more visual room maps and object positions; P2 - mini-story "мама на кухне".
- Recommended expansions: open door/window; find object in room; clean room game.
- Priority: P1.

### Unit 16: Город и транспорт

- Goal: городские места, транспорт, `иду/еду`, destination phrases.
- Works well: сильный финальный бытовой юнит; хорошо опирается на Unit 5 movement, Unit 9 day, Unit 10 cafe, Unit 15 home.
- Problems: `иду/еду` - критически важное различие; его нельзя оставлять только через тексты, нужны contrast scenes.
- Logic risks: городские карты могут стать navigation game без чтения, если цель видна сразу.
- Task quality: what/find transport/go/ride/kuda/scene/map tasks хорошо покрывают тему.
- Game quality: city map - хорошая кульминация курса; 7 игр дают много практики.
- Russian language issues: следить за `я иду в кафе`, `я еду домой`, `папа едет`, `мама идёт`.
- Visual/context issues: bus/metro/car/stops should be visually distinct; stop vs bus can blur.
- Recommended fixes: P1 - добавить contrast mini-drill `иду` vs `еду` с двумя сценами рядом.
- Recommended expansions: route to school; choose transport; city story with morning/day/evening.
- Priority: P1.

## Best expansion opportunities

1. Юниты, которым больше всего нужны новые задания: Unit 0, Unit 4, Unit 8, Unit 13, Unit 15, Unit 16.
2. Юниты, которым больше всего нужны новые игры: Unit 0 needs input-only reading games; Unit 4 needs role-play inventory/request; Unit 13 needs help/health scenario; Unit 16 needs transport route game.
3. Где добавить больше мини-историй: Unit 4 (`нет -> хочу -> дай`), Unit 8 (стол/корзина), Unit 12 -> Unit 13 bridge, Unit 15 home scenes, Unit 16 city routes.
4. Где добавить больше карт: Unit 6 room map, Unit 10 cafe/table map, Unit 13 help map, Unit 15 apartment map, Unit 16 city transport map.
5. Где добавить больше повторения: Unit 0 phonics, Unit 6 location chunks, Unit 7 adjective forms, Unit 8 count forms, Unit 11 clothing colors.
6. Где задания слишком однотипные: repeated `Что это?`/find-card games in Units 7-11 can be balanced with more action tasks.

## Recommended next prompts

1. Prompt 1: исправить P1 методические проблемы без нового юнита: убрать/заменить copy-ввод в Level 0, проверить `шаг/шага`, усилить `иду/еду`.
2. Prompt 2: улучшить ранние юниты 0-4: больше audio-first, больше context scenes, меньше механического выбора.
3. Prompt 3: улучшить игровые юниты 5-8: больше маршрутов, clearer map goals, больше listening-only rounds.
4. Prompt 4: улучшить сюжетные юниты 9-12: добавить story-review и мосты между погодой, одеждой, едой и днём.
5. Prompt 5: улучшить бытовые юниты 13-16: health/help scenes, apartment maps, city route contrast `иду/еду`.
6. Prompt 6: добавить финальный повторительный модуль без создания Unit 17: один top-level review внутри existing structure или отдельный review-button, если ты разрешишь.

## Criticality summary

- P0 problems: не обнаружены. Технические валидаторы проходят, аудио-пути закрыты, уроки 0-48 непрерывны.
- P1 problems:
  - Unit 0 содержит copy/write tasks, что конфликтует с input-first направлением.
  - Source data часто держит correct первым; рендереры shuffle это скрывают, но для будущих renderers это риск.
  - Unit 4/6/8/11/13/15/16 несут много скрытых падежных/числовых форм и требуют extra visual repetition.
  - `иду/еду` в Unit 16 нужно особенно усилить контрастом.
- P2 problems:
  - Часть games слишком похожа на выбор карточки.
  - Некоторым emoji-нужны будущие локальные картинки.
  - Карты требуют регулярного mobile playtest.

## Verification commands

Команды, которые надо запускать после этого отчёта:

```bash
python -B tools/lexiforge.py validate
python -B tools/lexiforge.py audio-plan --missing-only
python -B tools/lexiforge.py smoke
python -B tools/lexiforge.py validate --strict-audio
node --check js/app.js
```

Также полезно проверять все JS-файлы синтаксически через Node, потому что проект содержит много отдельных static modules.
