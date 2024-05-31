import pandas as pd

def append_columns_with_semicolon(input_file, output_file):
    # Baca file Excel
    df = pd.read_excel(input_file, engine='openpyxl')
    
    # Gabungkan kolom 1 dan 2 dengan semikolon
    df['Combined'] = df.iloc[:, 0].astype(str) + ';' + df.iloc[:, 1].astype(str)
    
    # Simpan ke file Excel baru
    df.to_excel(output_file, index=False, engine='openpyxl')
    
    print(f"File {output_file} telah dibuat dengan kolom 1 dan 2 digabungkan dengan semikolon.")

# Ganti nama file sesuai kebutuhan
input_file = 'output5.xlsx'
output_file = 'output6.xlsx'

# Panggil fungsi untuk mengappend kolom 1 dan 2
append_columns_with_semicolon(input_file, output_file)
