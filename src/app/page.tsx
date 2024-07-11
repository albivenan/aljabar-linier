"use client"
import { useState } from 'react';
import Image from 'next/image';
import profile from "../../public/albivenanza.jpg"

const Home = () => {
    const inisialisasiBaris = Array(3).fill(0);
    const inisialisasiMatriks = Array.from({ length: 3 }, () => [...inisialisasiBaris]);

    const [matriks, setMatriks] = useState<number[][]>(inisialisasiMatriks);
    const [inversMatriks, setInverseMatrix] = useState<number[][]>(inisialisasiMatriks);
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIdx: number, colIdx: number) => {
        const nilai = parseFloat(e.target.value);
        if (!isNaN(nilai)) {
            const newMatrix = matriks.map((row, rIdx) =>
                rIdx === rowIdx ? row.map((col, cIdx) => (cIdx === colIdx ? nilai : col)) : row
            );
            setMatriks(newMatrix);
        }
    };

    const operasiInvers = () => {
        try {
            const determinan = sarrusDeterminan(matriks);
            if (determinan === 0) {
                throw new Error("Nilai matriks yang dimasukkan tidak memiliki invers karena determinan adalah 0");
            }

            const kofaktor: number[][] = [];
            for (let r = 0; r < 3; r++) {
                const cofactorRow: number[] = [];
                for (let c = 0; c < 3; c++) {
                    const minor: number = matriks[(c + 1) % 3][(r + 1) % 3] * matriks[(c + 2) % 3][(r + 2) % 3] - matriks[(c + 1) % 3][(r + 2) % 3] * matriks[(c + 2) % 3][(r + 1) % 3];
                    cofactorRow.push(((-1) ** (r + c)) * minor);
                }
                kofaktor.push(cofactorRow);
            }

            const inversMatriksBaru: number[][] = Array.from({ length: 3 }, () => Array(3).fill(0));
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    inversMatriksBaru[r][c] = kofaktor[c][r] / determinan;
                }
            }

            setInverseMatrix(inversMatriksBaru);
            setError('');
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <>
        




        <div className="screen bg-neutral-100 mx-auto flex justify-center items-center">
      <div className="phone w-1/2 h-screen flex justify-center items-center">
      <div className="h-full py-8 flex flex-col justify-around items-center">
        <div className="text-lg text-center">
          <h2 className='font-bold'>HASIL KERJA UAS GENAP</h2>
          <h2 className='font-bold'>APLIKASI INVERS MATRIKS BUJUR SANGKAR (3X3) MENGGUNAKKAN METODE SARRUS</h2>
          <p className='text-sm mt-'>Diselesaikan guna memenuhi tugas akhir pada mata kuliah Aljabar Linier</p>
          <p className='text-sm'>Dosen Pengampu: Buang Budi Wahono, S. Si., M. Kom.</p>
        </div>
        <div className="w-[30vh] h-[30vh] flex justify-center items-center image">
          <Image src={profile} className='hover:opacity-50 duration-200' style={{width: '20vh', height: '20vh', borderRadius: '100%', objectFit: 'cover', objectPosition: 'top', transform: 'rotate(-40deg)'}} alt='profile' />
        </div>
        <div className="-mt-4 text-sm text-center flex gap-x-8">
          <p>Gei Zhinjian Albivenanza</p>
          <p>(231240001467)</p>
        </div>
        <div className="font-bold text-lg text-center">
          <h2>PROGRAM STUDI TEKNIK INFORMATIKA</h2>
          <h2>FAKULTAS SAINS DAN TEKNOLOGI</h2>
          <h2>UNIVERSITAS ISLAM NAHDLATUL ULAMA JEPARA</h2>
          <h2>TAHUN AKADEMIK 2023/2024</h2>
        </div>
      </div>
      </div>


      <div className="phone w-1/2 pr-8 relative rounded-l-3xl shadow-xl overflow-hidden">
      <div className="background absolute w-[200vh] h-[200vh]"></div>

      <div className="h-screen overflow-scroll px-8 grid gap-y-6 py-6 z-1 relative">
            <h1 className="text-3xl font-extrabold text-center mb-2">Aplikasi Operasi Invers Matriks Bujur Sangkar (3 x 3) Dengan Metode Sarrus</h1>
            <div className="grid gap-y-2">
            <label className='font-bold text-lg'>Masukkan nilai pada kolom dan baris berikut: </label>
                {matriks.map((row, rIdx) => (
                    <div key={rIdx} className="grid grid-cols-3 gap-4">
                        {row.map((col, cIdx) => (
                            <input
                                key={cIdx}
                                type="number"
                                value={col}
                                onChange={(e) => handleInputChange(e, rIdx, cIdx)}
                                className='p-2 rounded-xl focus:border-neutral-700 my-1'
                            />
                        ))}
                    </div>
                ))}
            </div>
            
            <h2 className="text-xl font-bold">Nilai matriks asli:</h2>
            {matriks.map((row, rIdx) => (
    <div className='grid grid-cols-3 gap-4' key={rIdx}>
        {row.map((element, idx) => (
            <div key={idx} className='p-2 rounded-xl focus:border-neutral-700 bg-white'>
                {element}
                {idx !== row.length - 1 && <p className=""></p>}
            </div>
        ))}
    </div>
))}

<button onClick={operasiInvers} className="font-bold text-xl bg-blue-600 text-white px-4 py-2 w-[60%] mx-auto rounded-full hover:bg-blue-800 duration-300'">
                Hitung Invers
            </button>
            <div className={`relative border-2 border-black px-2 py-6 rounded-2xl mt-4 bg-white  'shake'}`}>
        <p className="absolute font-bold text-lg -top-[10%] bg-blue-600 text-white px-4 py-2 rounded-xl">Hasil:</p>
    <div>
        <h2 className="text-lg font-bold mt-2 mb-2">Invers Matriks Bujur Sangkar (3 x 3):</h2>
        {error ? (
    <p className="text-red-500 font-bold">{error}</p>
) : (
    <div>
        {inversMatriks.map((row, rIdx) => (
            <div className='grid grid-cols-3 gap-4' key={rIdx}>
                {row.map((element, idx) => (
                    <div key={idx} className='p-2 rounded-xl border-2 border-black my-2 overflow-scroll'>
                        {element}
                        {idx !== row.length - 1 && <p className=""></p>}
                    </div>
                ))}
            </div>
        ))}
    </div>
)}

      
            </div>
            </div>
            </div>
            </div>
    </div>
        </>
    );
};

export default Home;

function sarrusDeterminan(matriks: number[][]) {
    return (
        matriks[0][0] * matriks[1][1] * matriks[2][2] +
        matriks[0][1] * matriks[1][2] * matriks[2][0] +
        matriks[0][2] * matriks[1][0] * matriks[2][1] -
        matriks[0][2] * matriks[1][1] * matriks[2][0] -
        matriks[0][0] * matriks[1][2] * matriks[2][1] -
        matriks[0][1] * matriks[1][0] * matriks[2][2]
    );
}
