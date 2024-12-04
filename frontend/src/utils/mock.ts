type Comment = {
  id: number;
  authorName: string;
  authorEmail: string;
  description: string;
  deletedBy?: "author" | "owner";
};

type Post = {
  id: number;
  title: string;
  description: string;
  authorName: string;
  authorEmail: string;
  date: string;
  likes: number;
  dislikes: number;
  views: number;
  comments: Comment[];
};

export const mockPost: Post[] = [
  {
    id: 1,
    title: "Almoço nos pais",
    description:
      "Olá hoje eu acordei feliz e fui para a casa dos meus pais, pretendo fazer um jantar muito delicioso para eles",
    authorName: "Cristiano Silva",
    authorEmail: "cristiano@example.com",
    date: "07/10/2024 às 11:52",
    likes: 17,
    dislikes: 3,
    views: 15,
    comments: [
      {
        id: 1,
        authorName: "Robson da Silva",
        authorEmail: "robson@example.com",
        description:
          "Gostei bastante do jantar, acabei repetindo o prato duas vezes",
      },
      {
        id: 2,
        authorName: "Jorge Amado",
        authorEmail: "jorge@example.com",
        description:
          "Acabei faltando ao jantar, tive que ir ao dentista e estava com muita dor",
      },
      {
        id: 3,
        authorName: "Jorge Amado",
        authorEmail: "jorge@example.com",
        description: "Queria ter ido também",
        deletedBy: "owner",
      },
    ],
  },
  {
    id: 2,
    title: "Balada de Despedida",
    description:
      "Fui na balada de despedida do nosso grande amigo Jorge, ele fez uma festa que vamos lembrar para sempre de tão boa que foi, espero que possamos repetir",
    authorName: " Carlos da Costa",
    authorEmail: "carlos@example.com",
    date: "05/11/2024 às 18:22",
    likes: 2,
    dislikes: 3,
    views: 15,
    comments: [
      {
        id: 1,
        authorName: "Robson da Silva",
        authorEmail: "robson@example.com",
        description: "To com muita fome",
        deletedBy: "author",
      },
      {
        id: 2,
        authorName: "Jorge Amado",
        authorEmail: "jorge@example.com",
        description:
          "Acabei faltando na festa, tive que ir ao dentista e estava com muita dor",
      },
      {
        id: 3,
        authorName: "Jorge Amado",
        authorEmail: "jorge@example.com",
        description: "To com muita fome demais",
      },
    ],
  },
];
