import type { Clinic } from './clinics';

export type ClinicId = Clinic['id'];
export type Category = 'top' | 'lead' | 'doctor';

export interface Doctor {
  id: string;
  name: string; // «Фамилия Имя Отчество»
  role?: string;
  degree?: string;
  category: Category;
  clinics: ClinicId[]; // [] — клиника не указана, нужно уточнить
  specialties: string[];
  /** Чаще всего упоминается в отзывах на Картах: выводим первыми */
  featured?: number;
}

const d = (x: Doctor) => x;

export const doctors: Doctor[] = [
  d({ id: 'lebedko', name: 'Лебедько Евгений Иванович', role: 'Главный врач', degree: 'к.в.н.', category: 'top', clinics: ['ramenki'], specialties: ['Терапия', 'Хирургия', 'Гастроскопия', 'Офтальмология', 'Стоматология', 'Экзотические животные', 'УЗИ'], featured: 1 }),
  d({ id: 'kozlova', name: 'Козлова Светлана Алексеевна', category: 'lead', clinics: ['ramenki'], specialties: ['Терапия', 'Стационар', 'Реанимация', 'Интенсивная терапия', 'Кардиология'], featured: 2 }),
  d({ id: 'muravieva', name: 'Муравьёва Елена Александровна', degree: 'к.в.н.', category: 'top', clinics: ['ramenki'], specialties: ['Эндокринология', 'УЗИ', 'Нефрология', 'Дерматология', 'Гастроэнтерология'], featured: 3 }),
  d({ id: 'aksenov', name: 'Аксенов Алексей Алексеевич', degree: 'к.б.н.', category: 'top', clinics: ['olimp'], specialties: ['Хирургия', 'Гастроскопия', 'Эндоскопия', 'Травматология', 'Неврология', 'Ортопедия', 'Стоматология'], featured: 4 }),
  d({ id: 'sadvakasova', name: 'Садвакасова Мадина Ануаровна', category: 'doctor', clinics: ['ramenki'], specialties: ['Терапия', 'Нефрология'], featured: 5 }),
  d({ id: 'feraybert', name: 'Ферайберт Евгений Викторович', category: 'top', clinics: ['vidnoe'], specialties: ['Общая терапия', 'Травматология', 'Акушерство', 'Интенсивная терапия', 'Стоматология', 'Неврология'], featured: 6 }),
  d({ id: 'paramonov', name: 'Парамонов Юрий Петрович', category: 'lead', clinics: ['ramenki'], specialties: ['Терапия', 'Анестезиология', 'Реанимация', 'Кардиология', 'Онкология', 'Нефрология', 'УЗИ', 'Гастроэнтерология'], featured: 7 }),
  d({ id: 'zaychenko', name: 'Зайченко Ирина Юрьевна', degree: 'к.б.н.', category: 'top', clinics: ['vidnoe'], specialties: ['Терапия', 'Акушерство', 'УЗИ', 'Дерматология', 'Стоматология', 'Реанимация'], featured: 8 }),
  d({ id: 'belimova', name: 'Белимова Наталья Сергеевна', category: 'top', clinics: ['vidnoe'], specialties: ['Терапия', 'Хирургия', 'Акушерство', 'Стоматология', 'Офтальмология', 'Дерматология', 'Инфекционные болезни'], featured: 9 }),
  d({ id: 'karahanova', name: 'Караханова Даяна Габидуллаевна', category: 'lead', clinics: ['ramenki'], specialties: ['Терапия', 'Гастроэнтерология', 'Гематология', 'УЗИ', 'Инфекционные болезни'], featured: 10 }),
  d({ id: 'denisenko', name: 'Денисенко Евгений Сергеевич', category: 'lead', clinics: ['ramenki'], specialties: ['Хирургия', 'Гастроскопия', 'Эндоскопия', 'Травматология', 'Неврология', 'Ортопедия', 'Стоматология'], featured: 11 }),
  d({ id: 'illarionova', name: 'Илларионова Ольга Геннадьевна', degree: 'к.б.н.', category: 'top', clinics: ['olimp'], specialties: ['Кардиология', 'Анестезия', 'Реанимация'], featured: 12 }),
  d({ id: 'sarkisyan', name: 'Саркисьян Юлия Гариковна', category: 'top', clinics: ['olimp'], specialties: ['Терапия', 'Неврология', 'УЗИ', 'Офтальмология'], featured: 13 }),
  d({ id: 'zenchenkova', name: 'Зенченкова Анна Петровна', category: 'lead', clinics: ['olimp'], specialties: ['Терапия', 'Дерматология', 'Вирусология', 'Инфекционные болезни', 'УЗИ'] }),
  d({ id: 'petrova', name: 'Петрова Дарья Андреевна', category: 'doctor', clinics: [], specialties: ['Терапия', 'Кардиология'] }),
  d({ id: 'lyuliev', name: 'Люлиев Богдан Русланович', category: 'doctor', clinics: ['ramenki'], specialties: ['Терапия', 'Анестезия', 'Реанимация'] }),
  d({ id: 'mytkina', name: 'Мыткина Евгения Юрьевна', category: 'doctor', clinics: ['olimp'], specialties: ['Терапия', 'УЗИ', 'Экзотические животные'] }),
  d({ id: 'dyakonova', name: 'Дьяконова Ольга Алексеевна', category: 'doctor', clinics: [], specialties: ['Терапия', 'Диетология'] }),
  d({ id: 'vershapova', name: 'Вершапова Евгения Андреевна', category: 'doctor', clinics: ['olimp'], specialties: ['Терапия', 'УЗИ'] }),
  d({ id: 'filatova', name: 'Филатова Маргарита Игоревна', category: 'doctor', clinics: ['ramenki'], specialties: ['Терапия', 'Стационар', 'УЗИ'] }),
  d({ id: 'skorobogatiy', name: 'Скоробогатый Егор Игоревич', category: 'doctor', clinics: ['olimp'], specialties: ['Терапия', 'Хирургия', 'Экзотические животные', 'Стоматология'] }),
  d({ id: 'voloshko', name: 'Волошко Виктория Ильинична', category: 'doctor', clinics: ['ramenki'], specialties: ['Терапия', 'Стационар', 'УЗИ'] }),
  d({ id: 'odintsova', name: 'Одинцова Алина Константиновна', category: 'doctor', clinics: ['olimp'], specialties: ['Терапия'] }),
  d({ id: 'kulikova', name: 'Куликова Алина Михайловна', category: 'doctor', clinics: ['olimp', 'ramenki'], specialties: ['Терапия'] }),
  d({ id: 'saulidi', name: 'Саулиди Елена Александровна', category: 'doctor', clinics: ['vidnoe'], specialties: [] }),
  d({ id: 'dmitrieva', name: 'Дмитриева Виктория Дмитриевна', category: 'doctor', clinics: [], specialties: [] }),
  d({ id: 'erycheva', name: 'Ерычева Анастасия Андреевна', category: 'doctor', clinics: [], specialties: ['Терапия', 'Стационар'] }),
  d({ id: 'rantyuk', name: 'Рантюк Евгения Николаевна', category: 'doctor', clinics: [], specialties: ['Терапия'] }),
];

export const labDoctors = [
  { name: 'Кабакова Вера Владимировна', role: 'Заведующая лабораторией, врач КЛД' },
  { name: 'Козырева Елена Игоревна', role: 'Врач КЛД' },
  { name: 'Аксенова Наталия Владимировна', role: 'Врач КЛД' },
];

export const allSpecialties = Array.from(new Set(doctors.flatMap((x) => x.specialties))).sort((a, b) => a.localeCompare(b, 'ru'));

export const featuredDoctors = doctors.filter((x) => x.featured).sort((a, b) => a.featured! - b.featured!);

export const initials = (name: string) => {
  const [last, first] = name.split(' ');
  return `${last[0]}${first?.[0] ?? ''}`;
};
